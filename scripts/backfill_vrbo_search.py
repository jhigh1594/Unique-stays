#!/usr/bin/env python3
"""Find VRBO images via web search + new-format URL scrape.

Old VRBO URLs (vrbo.com/123456) trigger bot detection.
New-format URLs (vrbo.com/1234567) work with Firecrawl.
Strategy: search for similar listing → scrape new URL → extract og:image.
"""
import json
import re
import subprocess
import time
from pathlib import Path

STAYS_FILE = Path("client/src/lib/stays-data.ts")
FIRECRAWL_DIR = Path(".firecrawl")

# Remaining failed VRBO listings: id → search query for finding a similar property
SEARCH_QUERIES = {
    "east-zion-treetop-ut": "east zion resort treetop treehouse cabin utah vrbo",
    "87-getaway-treehouse-ar": "87 getaway treehouse arkansas ozarks vrbo rental",
    "pedernales-aframe-fredericksburg-tx": "pedernales fredericksburg a-frame cabin texas vrbo",
    "canyon-lake-aframe-tx": "canyon lake a-frame cabin texas vrbo rental",
    "berkshires-aframe-becket-ma": "berkshires a-frame cabin becket massachusetts vrbo",
    "sierra-dome-arnold-ca": "geodesic dome arnold sierra nevada california vrbo",
    "boho-dome-terlingua-tx": "boho dome terlingua big bend texas vrbo glamping",
    "bunny-bungalow-dome-oh": "geodesic dome ohio hocking hills bunny bungalow vrbo",
    "ozarks-church-harrison-ar": "converted church harrison arkansas ozarks vrbo vacation rental",
    "centre-county-church-pa": "converted church centre county pennsylvania vrbo vacation",
    "newport-firehouse-ri": "newport firehouse rhode island vrbo vacation rental",
    "luxury-tiny-woodstock-nh": "luxury tiny house woodstock new hampshire vrbo",
    "tiny-community-lancaster-pa": "tiny home community lancaster pennsylvania vrbo rental",
    "murray-tiny-chatsworth-ga": "tiny house chatsworth georgia mountains vrbo",
    "keys-luxury-houseboat-fl": "florida keys luxury houseboat vrbo vacation rental",
    "shire-of-montana-trout-creek": "shire hobbit hole montana cabin trout creek vrbo",
    "eagle-harbor-lighthouse-mi": "eagle harbor lighthouse michigan keweenaw peninsula vrbo",
}


def firecrawl_search(query: str, limit: int = 5) -> list[str]:
    """Return VRBO URLs found via Firecrawl search."""
    result = subprocess.run(
        ["firecrawl", "search", query, "--limit", str(limit)],
        capture_output=True, text=True, timeout=30
    )
    # Parse VRBO URLs from output
    # Output format: "Title\n  URL: https://...\n  description..."
    urls = re.findall(r"URL: (https://www\.vrbo\.com/\S+)", result.stdout)
    return urls


def scrape_vrbo_listing(url: str, out_path: Path):
    """Scrape a VRBO listing page and return og:image."""
    if out_path.exists():
        with open(out_path) as f:
            data = json.load(f)
        title = data.get("metadata", {}).get("title", "")
        if any(err in title for err in ["Too Many Requests", "Bot or Not", "Error"]):
            out_path.unlink()
        else:
            og = data.get("metadata", {}).get("ogImage", "")
            if og and "media.vrbo.com" in og:
                return og.split("?")[0]
            return None

    cmd = ["firecrawl", "scrape", url, "--wait-for", "2000", "--format", "markdown,links", "-o", str(out_path)]
    try:
        subprocess.run(cmd, capture_output=True, text=True, timeout=90)
    except subprocess.TimeoutExpired:
        print(f"    [TIMEOUT]")
        return None
    if out_path.exists():
        with open(out_path) as f:
            data = json.load(f)
        og = data.get("metadata", {}).get("ogImage", "")
        if og and "media.vrbo.com" in og:
            return og.split("?")[0]
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
    success = 0

    for stay_id, query in SEARCH_QUERIES.items():
        print(f"\n--- {stay_id} ---")
        print(f"  Query: {query}")

        # Search for similar VRBO listings
        urls = firecrawl_search(query)
        print(f"  Found {len(urls)} VRBO URLs: {urls[:3]}")

        # Filter out area/travel-guide URLs (only keep direct listing URLs)
        listing_urls = [u for u in urls if re.match(r"https://www\.vrbo\.com/[\dha]+$", u) or re.match(r"https://www\.vrbo\.com/en-\w+/", u)]
        if not listing_urls:
            print(f"  [SKIP] No listing URLs found in search results")
            continue

        img_url = None
        for url in listing_urls[:4]:
            url_id = url.rstrip("/").split("/")[-1]
            out_path = FIRECRAWL_DIR / f"vrbo-search-{stay_id}.json"
            img_url = scrape_vrbo_listing(url, out_path)
            if img_url:
                print(f"  [OK] {url} → {img_url[:80]}")
                break
            else:
                print(f"  [FAIL] {url}")
            time.sleep(1)

        if img_url:
            content = update_stays_file(content, stay_id, img_url)
            success += 1
            # Save incrementally to preserve progress
            STAYS_FILE.write_text(content)
        else:
            print(f"  [SKIP] No image found")

        time.sleep(2)
    remaining = content.count("// TODO")
    print(f"\n\nSearch+scrape: {success}/{len(SEARCH_QUERIES)} updated. Remaining TODO: {remaining}")


if __name__ == "__main__":
    main()
