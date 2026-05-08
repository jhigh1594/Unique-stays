#!/usr/bin/env python3
"""Batch backfill image URLs for stays with // TODO placeholders.

Usage:
  python3 scripts/backfill_images.py --platform airbnb   # process Airbnb only
  python3 scripts/backfill_images.py --platform direct   # process Direct only
  python3 scripts/backfill_images.py --platform all      # process all

Each successful update modifies stays-data.ts in place.
"""
import argparse
import json
import os
import re
import subprocess
import sys
import time
from pathlib import Path

STAYS_FILE = Path("client/src/lib/stays-data.ts")
FIRECRAWL_DIR = Path(".firecrawl")
FIRECRAWL_DIR.mkdir(exist_ok=True)


def parse_todos(content: str, platform_filter=None) -> list[dict]:
    """Extract all TODO image entries with their metadata."""
    lines = content.split("\n")
    todos = []
    for i, line in enumerate(lines):
        if "// TODO" not in line or "image:" not in line:
            continue
        id_val = affiliate_val = platform_val = None
        for j in range(i - 1, max(0, i - 30), -1):
            if id_val is None and "  id: '" in lines[j]:
                m = re.search(r"id: '([^']+)'", lines[j])
                id_val = m.group(1) if m else None
            if affiliate_val is None and "affiliateUrl:" in lines[j]:
                m = re.search(r"affiliateUrl: '([^']+)'", lines[j])
                affiliate_val = m.group(1) if m else None
            if platform_val is None and "platform:" in lines[j]:
                m = re.search(r"platform: '([^']+)'", lines[j])
                platform_val = m.group(1) if m else None
        img_match = re.search(r"image: '([^']+)'", line)
        img_placeholder = img_match.group(1) if img_match else None
        if platform_filter and platform_filter.lower() not in (platform_val or "").lower():
            continue
        todos.append({
            "line": i + 1,
            "line_idx": i,
            "id": id_val,
            "platform": platform_val,
            "affiliateUrl": affiliate_val,
            "placeholder": img_placeholder,
        })
    return todos


def scrape_with_firecrawl(url: str, output_path: Path, wait_ms: int = 0):
    """Scrape URL with Firecrawl and return parsed JSON."""
    cmd = ["firecrawl", "scrape", url, "--format", "markdown,links", "-o", str(output_path)]
    if wait_ms:
        cmd += ["--wait-for", str(wait_ms)]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
    if result.returncode != 0:
        print(f"  [WARN] firecrawl failed: {result.stderr[:200]}")
        return None
    if output_path.exists():
        with open(output_path) as f:
            return json.load(f)
    return None


def extract_airbnb_image(data: dict):
    """Extract the hero photo from Airbnb Firecrawl output."""
    # og:image is always the cover/hero photo and is present in all Airbnb listing pages
    og = data.get("metadata", {}).get("ogImage") or data.get("metadata", {}).get("og:image")
    if og and "a0.muscache.com" in og:
        return og.split("?")[0]

    # Fallback: miso/Hosting URLs in markdown
    md = data.get("markdown", "")
    all_urls = re.findall(r"https://a0\.muscache\.com[^\s\)\"\']+", md)
    listing_imgs = [u for u in all_urls if "miso/Hosting" in u]
    if listing_imgs:
        return listing_imgs[0].split("?")[0]
    return None


def extract_wander_image(data: dict):
    """Extract the first property photo from Wander Firecrawl output."""
    md = data.get("markdown", "")
    urls = re.findall(r"https://assets\.wander\.com[^\s\)\"\']+", md)
    if urls:
        return urls[0].split("?")[0]
    return None


def extract_generic_image(data: dict, domain_hint: str):
    """Extract first image from a page matching domain hint."""
    md = data.get("markdown", "")
    pattern = rf"https://[^\s\)\"\']*{re.escape(domain_hint)}[^\s\)\"\']*\.(?:jpg|jpeg|png|webp)"
    urls = re.findall(pattern, md, re.IGNORECASE)
    if urls:
        return urls[0].split("?")[0]
    # Fallback: any markdown image
    imgs = re.findall(r"!\[.*?\]\((https://[^\)]+\.(?:jpg|jpeg|png|webp))[^\)]*\)", md)
    if imgs:
        return imgs[0].split("?")[0]
    return None


def update_stays_file(content: str, stay_id: str, new_url: str) -> str:
    """Replace the placeholder image URL for a specific stay."""
    # Match the exact line pattern for this stay's image
    pattern = rf"(  id: '{re.escape(stay_id)}',.*?image: ')(https://[^']+placeholder\.jpeg)',(\s*// TODO[^\n]*)"
    replacement = rf"\g<1>{new_url}',"
    new_content, n = re.subn(pattern, replacement, content, flags=re.DOTALL)
    if n == 0:
        # Try simpler single-line pattern
        lines = content.split("\n")
        # Find the stay block
        in_stay = False
        for i, line in enumerate(lines):
            if f"  id: '{stay_id}'," in line:
                in_stay = True
            if in_stay and "// TODO" in line and "image:" in line:
                lines[i] = re.sub(
                    r"image: '([^']+placeholder\.jpeg)',(\s*// TODO[^\n]*)",
                    f"image: '{new_url}',",
                    line,
                )
                new_content = "\n".join(lines)
                return new_content
        return content
    return new_content


def process_airbnb(todos: list[dict], content: str, dry_run: bool = False) -> str:
    """Process all Airbnb TODO listings."""
    print(f"\n=== Processing {len(todos)} Airbnb listings ===")
    success = 0
    for i, todo in enumerate(todos):
        stay_id = todo["id"]
        url = todo["affiliateUrl"]
        out_path = FIRECRAWL_DIR / f"airbnb-{stay_id}.json"
        print(f"[{i+1}/{len(todos)}] {stay_id} -> {url}")
        if out_path.exists():
            print("  [CACHED] Using existing scrape")
            with open(out_path) as f:
                data = json.load(f)
        else:
            data = scrape_with_firecrawl(url, out_path)
            time.sleep(0.5)  # small delay between requests
        if data is None:
            print("  [FAIL] No data returned")
            continue
        img_url = extract_airbnb_image(data)
        if not img_url:
            print("  [FAIL] No listing image found")
            continue
        print(f"  [OK] {img_url}")
        if not dry_run:
            content = update_stays_file(content, stay_id, img_url)
        success += 1
    print(f"\nAirbnb: {success}/{len(todos)} updated")
    return content


def process_direct(todos: list[dict], content: str, dry_run: bool = False) -> str:
    """Process Direct platform TODO listings with site-specific logic."""
    print(f"\n=== Processing {len(todos)} Direct listings ===")
    success = 0

    # Known direct image URLs (hardcoded fallbacks)
    KNOWN_IMAGES = {
        # TreeHouse Point - use their main property photo
        "treehouse-point-temple-wa": "https://www.treehousepoint.com/wp-content/uploads/2019/07/Temple-of-the-Blue-Moon-1.jpg",
        # Big Bay Point Lighthouse - use their main photo
        "big-bay-point-lighthouse-mi": "https://bigbaylighthouse.com/wp-content/uploads/2018/08/big-bay-point-lighthouse-exterior.jpg",
        # Lake Vermilion Houseboat
        "lake-vermilion-houseboat-mn": "https://vermilionhouseboats.com/wp-content/uploads/houseboat-vermilion.jpg",
    }

    # AutoCamp known photo URLs
    AUTOCAMP_IMAGES = {
        "autocamp-joshua-tree-ca": "https://autocamp.com/wp-content/uploads/2023/03/autocamp-joshua-tree-airstream-exterior.jpg",
        "autocamp-yosemite-ca": "https://autocamp.com/wp-content/uploads/2022/05/autocamp-yosemite-airstream-exterior.jpg",
        "autocamp-catskills-ny": "https://autocamp.com/wp-content/uploads/2023/08/autocamp-catskills-airstream-exterior.jpg",
    }

    for i, todo in enumerate(todos):
        stay_id = todo["id"]
        url = todo["affiliateUrl"]
        print(f"[{i+1}/{len(todos)}] {stay_id} -> {url}")

        # Check hardcoded known images first
        img_url = KNOWN_IMAGES.get(stay_id) or AUTOCAMP_IMAGES.get(stay_id)
        if img_url:
            print(f"  [HARDCODED] {img_url}")
            if not dry_run:
                content = update_stays_file(content, stay_id, img_url)
            success += 1
            continue

        # Try Firecrawl for Postcard Cabins and others
        out_path = FIRECRAWL_DIR / f"direct-{stay_id}.json"
        if out_path.exists():
            print("  [CACHED] Using existing scrape")
            with open(out_path) as f:
                data = json.load(f)
        else:
            data = scrape_with_firecrawl(url, out_path, wait_ms=2000)
            time.sleep(0.5)

        if data is None:
            print("  [FAIL] No data returned")
            continue

        # Try to find a property-specific image
        md = data.get("markdown", "")
        # Look for high-res images (at least 600px wide based on filename hints)
        all_imgs = re.findall(
            r"!\[.*?\]\((https://[^\)]+\.(?:jpg|jpeg|png|webp))[^\)]*\)", md
        )
        # Filter out logos, icons, flags
        real_imgs = [
            u for u in all_imgs
            if not any(kw in u.lower() for kw in ["logo", "icon", "flag", "favicon", "avatar", "brand"])
        ]
        if real_imgs:
            img_url = real_imgs[0].split("?")[0]
            print(f"  [OK] {img_url}")
            if not dry_run:
                content = update_stays_file(content, stay_id, img_url)
            success += 1
        else:
            print("  [FAIL] No suitable image found")

    print(f"\nDirect: {success}/{len(todos)} updated")
    return content


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--platform", default="airbnb", choices=["airbnb", "direct", "wander", "all"])
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--limit", type=int, default=0, help="Process only N listings (for testing)")
    args = parser.parse_args()

    content = STAYS_FILE.read_text()
    todos = parse_todos(content)
    print(f"Found {len(todos)} TODO listings total")

    if args.platform in ("airbnb", "all"):
        airbnb_todos = [t for t in todos if t["platform"] == "Airbnb"]
        if args.limit:
            airbnb_todos = airbnb_todos[: args.limit]
        content = process_airbnb(airbnb_todos, content, args.dry_run)

    if args.platform in ("direct", "all"):
        direct_todos = [t for t in todos if t["platform"] == "Direct"]
        if args.limit:
            direct_todos = direct_todos[: args.limit]
        content = process_direct(direct_todos, content, args.dry_run)

    if args.platform in ("wander", "all"):
        wander_todos = [t for t in todos if t["platform"] == "Wander"]
        print(f"\nWander: {len(wander_todos)} TODO listings (none expected)")

    if not args.dry_run:
        STAYS_FILE.write_text(content)
        remaining = content.count("// TODO")
        print(f"\nWrote {STAYS_FILE}. Remaining TODO: {remaining}")
    else:
        print("\n[DRY RUN] No files modified")


if __name__ == "__main__":
    main()
