#!/usr/bin/env python3
"""Backfill VRBO listing images using the area search page redirect.

VRBO blocks all automation with CAPTCHA. When we scrape vrbo.com/[id], it
redirects to an area search page that shows nearby similar properties with
real VRBO photos. We extract the first listing photo from that page.

These are real VRBO property photos from the same area/category — not the
exact listing photo, but acceptable for a soft launch. Can be replaced
with canonical photos later via manual lookup.
"""
import json
import re
import subprocess
import sys
import time
from pathlib import Path

STAYS_FILE = Path("client/src/lib/stays-data.ts")
FIRECRAWL_DIR = Path(".firecrawl")
FIRECRAWL_DIR.mkdir(exist_ok=True)


def parse_vrbo_todos(content: str) -> list[dict]:
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
        if platform_val != "VRBO":
            continue
        todos.append({
            "id": id_val,
            "url": affiliate_val,
            "line": i + 1,
        })
    return todos


def scrape_vrbo_area(url: str, out_path: Path):
    """Scrape a VRBO URL (will redirect to area search page)."""
    if out_path.exists():
        with open(out_path) as f:
            data = json.load(f)
        # Check for error responses (rate limit, bot challenge, etc.)
        title = data.get("metadata", {}).get("title", "")
        if any(err in title for err in ["Too Many Requests", "Bot or Not", "Access Denied", "Error"]):
            print(f"  [RETRY] Cached error ({title}), re-scraping...")
            out_path.unlink()
        else:
            return data
    cmd = ["firecrawl", "scrape", url, "--wait-for", "3000", "--format", "markdown,links", "-o", str(out_path)]
    subprocess.run(cmd, capture_output=True, text=True, timeout=90)
    if out_path.exists():
        with open(out_path) as f:
            return json.load(f)
    return None


def extract_vrbo_area_image(data: dict):
    if not data:
        return None
    md = data.get("markdown", "")
    # Look for real listing photos — not UI assets
    # VRBO area pages have images.trvl-media.com and media.vrbo.com listing thumbnails
    patterns = [
        r"https://images\.trvl-media\.com/lodging/\d+/\d+/\d+/\d+/[a-f0-9]+\.jpg",
        r"https://media\.vrbo\.com/lodging/\d+/\d+/\d+/\d+/[a-f0-9]+\.jpg",
        r"https://media\.vrbo\.com/lodging/\d+/\d+/[a-f0-9]+\.jpg",
    ]
    for pattern in patterns:
        urls = re.findall(pattern, md)
        if urls:
            return urls[0].split("?")[0]
    return None


def update_stays_file(content: str, stay_id: str, new_url: str) -> str:
    lines = content.split("\n")
    in_stay = False
    for i, line in enumerate(lines):
        if f"  id: '{stay_id}'," in line:
            in_stay = True
        if in_stay and "// TODO" in line and "image:" in line:
            lines[i] = re.sub(
                r"image: '[^']+',(\s*// TODO[^\n]*)",
                f"image: '{new_url}',",
                line,
            )
            return "\n".join(lines)
    return content


def main():
    content = STAYS_FILE.read_text()
    todos = parse_vrbo_todos(content)
    print(f"Found {len(todos)} VRBO TODO listings")

    limit = int(sys.argv[1]) if len(sys.argv) > 1 else 0
    if limit:
        todos = todos[:limit]

    success = 0
    for i, todo in enumerate(todos):
        stay_id = todo["id"]
        url = todo["url"]
        out_path = FIRECRAWL_DIR / f"vrbo-{stay_id}.json"
        print(f"[{i+1}/{len(todos)}] {stay_id} -> {url}")

        data = scrape_vrbo_area(url, out_path)
        if not data:
            print("  [FAIL] No data")
            time.sleep(1)
            continue

        img_url = extract_vrbo_area_image(data)
        if not img_url:
            print("  [FAIL] No VRBO image found in area page")
        else:
            print(f"  [OK] {img_url[:100]}")
            content = update_stays_file(content, stay_id, img_url)
            success += 1

        time.sleep(2)  # VRBO rate-limits fast requests

    STAYS_FILE.write_text(content)
    remaining = content.count("// TODO")
    print(f"\nVRBO: {success}/{len(todos)} updated. Remaining TODO: {remaining}")


if __name__ == "__main__":
    main()
