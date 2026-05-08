#!/usr/bin/env python3
"""Final cleanup: Postcard Cabins + remaining VRBO + failed Airbnb listings."""
import json
import re
import subprocess
import time
from pathlib import Path

STAYS_FILE = Path("client/src/lib/stays-data.ts")
FIRECRAWL_DIR = Path(".firecrawl")


def scrape_url(url: str, out_path: Path, wait_ms: int = 2000):
    if out_path.exists():
        with open(out_path) as f:
            data = json.load(f)
        title = data.get("metadata", {}).get("title", "")
        if any(err in title for err in ["Too Many Requests", "Bot or Not", "Error 4", "Error 5"]):
            out_path.unlink()
        else:
            return data
    cmd = ["firecrawl", "scrape", url, "--wait-for", str(wait_ms), "--format", "markdown,links", "-o", str(out_path)]
    try:
        subprocess.run(cmd, capture_output=True, text=True, timeout=90)
    except subprocess.TimeoutExpired:
        return None
    if out_path.exists():
        with open(out_path) as f:
            return json.load(f)
    return None


def get_og_image(data: dict, domain_hints=None):
    og = data.get("metadata", {}).get("ogImage") or data.get("metadata", {}).get("og:image")
    if og and not any(junk in og.lower() for junk in ["ccpa", "logo", "icon", "placeholder", "sprite", "14x14", "29x14"]):
        if not domain_hints or any(h in og for h in domain_hints):
            return og.split("?")[0]

    # Try markdown images
    md = data.get("markdown", "")
    patterns = domain_hints or []
    for hint in patterns:
        urls = re.findall(rf"https://[^\s\)\"\']*{re.escape(hint)}[^\s\)\"\']*\.(?:jpg|jpeg|png|webp)", md)
        if urls:
            return urls[0].split("?")[0]

    # Any markdown image that looks like a property photo
    imgs = re.findall(r"!\[.*?\]\((https://[^\)]+\.(?:jpg|jpeg|png))[^\)]*\)", md)
    good = [u for u in imgs if not any(j in u.lower() for j in ["ccpa", "logo", "icon", "sprite", "flag", "14x14", "29x14", "brand"])]
    if good:
        return good[0].split("?")[0]
    return None


def firecrawl_search(query: str, limit: int = 5) -> list[str]:
    result = subprocess.run(
        ["firecrawl", "search", query, "--limit", str(limit)],
        capture_output=True, text=True, timeout=30
    )
    return re.findall(r"URL: (https://\S+)", result.stdout)


def update_stays_file(content: str, stay_id: str, new_url: str) -> str:
    lines = content.split("\n")
    in_stay = False
    for i, line in enumerate(lines):
        if f"  id: '{stay_id}'," in line:
            in_stay = True
        if in_stay and "// TODO" in line and "image:" in line:
            lines[i] = re.sub(r"image: '[^']+',(\s*// TODO[^\n]*)", f"image: '{new_url}',", line)
            return "\n".join(lines)
    return content


def process(stay_id: str, img_url: str, content: str) -> str:
    print(f"  [OK] {img_url[:80]}")
    content = update_stays_file(content, stay_id, img_url)
    STAYS_FILE.write_text(content)
    return content


def main():
    content = STAYS_FILE.read_text()

    # ─── VRBO stragglers ───
    vrbo_stragglers = {
        "bunny-bungalow-dome-oh": [
            ("geodesic dome cabin ohio hocking hills vrbo", ["media.vrbo.com", "trvl-media.com"]),
        ],
        "shire-of-montana-trout-creek": [
            ("unique cabin trout creek clark fork idaho montana vrbo rental", ["media.vrbo.com", "trvl-media.com"]),
        ],
        "eagle-harbor-lighthouse-mi": [
            ("lighthouse rental michigan upper peninsula vrbo keweenaw", ["media.vrbo.com", "trvl-media.com"]),
        ],
    }

    for stay_id, queries in vrbo_stragglers.items():
        print(f"\n--- {stay_id} ---")
        if f"id: '{stay_id}'" not in content or "// TODO" not in content[content.find(f"id: '{stay_id}'"): content.find(f"id: '{stay_id}'")+500]:
            print("  [ALREADY DONE]")
            continue
        found = False
        for query, hints in queries:
            print(f"  Search: {query}")
            urls = [u for u in firecrawl_search(query) if re.match(r"https://www\.vrbo\.com/[\dha]+$", u) or "vrbo.com/en-" in u]
            print(f"  VRBO URLs: {urls[:3]}")
            for url in urls[:4]:
                data = scrape_url(url, FIRECRAWL_DIR / f"vrbo-final-{stay_id}.json")
                if data:
                    img_url = data.get("metadata", {}).get("ogImage", "")
                    if img_url and any(h in img_url for h in hints):
                        content = process(stay_id, img_url.split("?")[0], content)
                        found = True
                        break
                time.sleep(1)
            if found:
                break
        if not found:
            print(f"  [SKIP]")
        time.sleep(2)

    # ─── Postcard Cabins ───
    postcard_cabins = {
        "postcard-mount-adams-wa": "postcard cabins mount adams washington state photos vacation",
        "postcard-big-bear-ca": "postcard cabins big bear california rental photos",
        "postcard-piney-woods-tx": "postcard cabins piney woods texas rental photos",
        "postcard-hocking-hills-oh": "postcard cabins hocking hills ohio rental photos",
        "postcard-catskills-ny": "postcard cabins catskills new york rental photos",
        "postcard-suches-ga": "postcard cabins suches georgia blue ridge rental photos",
        "postcard-dale-hollow-tn": "postcard cabins dale hollow tennessee rental photos",
        "postcard-lake-hartwell-sc": "postcard cabins lake hartwell south carolina photos",
    }

    for stay_id, query in postcard_cabins.items():
        print(f"\n--- {stay_id} ---")
        if f"id: '{stay_id}'" not in content or "// TODO" not in content[content.find(f"id: '{stay_id}'"): content.find(f"id: '{stay_id}'")+500]:
            print("  [ALREADY DONE]")
            continue
        print(f"  Search: {query}")
        urls = firecrawl_search(query)
        print(f"  URLs: {urls[:5]}")
        found = False
        for url in urls[:5]:
            if any(skip in url for skip in ["google.", "facebook.", "twitter.", "instagram.", "airbnb.", "vrbo."]):
                continue
            data = scrape_url(url, FIRECRAWL_DIR / f"postcard-final-{stay_id}.json", wait_ms=3000)
            if data:
                img_url = get_og_image(data, ["marriott", "postcard", "cabin", "wp-content"])
                if img_url and not any(junk in img_url.lower() for junk in ["ccpa", "14x14", "placeholder"]):
                    content = process(stay_id, img_url, content)
                    found = True
                    break
            time.sleep(1)
        if not found:
            print(f"  [SKIP]")
        time.sleep(2)

    # ─── Failed Airbnb ───
    failed_airbnb = {
        "outlier-inn-dome-ny": "https://www.airbnb.com/rooms/1602932",
        "glass-tiny-warren-vt": "https://www.airbnb.com/rooms/708067475095659552",
    }

    for stay_id, url in failed_airbnb.items():
        print(f"\n--- {stay_id} ---")
        if f"id: '{stay_id}'" not in content or "// TODO" not in content[content.find(f"id: '{stay_id}'"): content.find(f"id: '{stay_id}'")+500]:
            print("  [ALREADY DONE]")
            continue
        out_path = FIRECRAWL_DIR / f"airbnb-retry-{stay_id}.json"
        if out_path.exists():
            out_path.unlink()  # Force retry
        data = scrape_url(url, out_path, wait_ms=5000)
        if data:
            og = data.get("metadata", {}).get("ogImage") or data.get("metadata", {}).get("og:image")
            if og and "a0.muscache.com" in og:
                content = process(stay_id, og.split("?")[0], content)
                continue
        # Fallback: search for it
        title_hint = stay_id.replace("-", " ").title()
        search_urls = firecrawl_search(f"{title_hint} airbnb")
        for su in search_urls[:3]:
            if "airbnb.com" in su:
                data2 = scrape_url(su, FIRECRAWL_DIR / f"airbnb-search-{stay_id}.json")
                if data2:
                    og = data2.get("metadata", {}).get("ogImage", "")
                    if og and "a0.muscache.com" in og:
                        content = process(stay_id, og.split("?")[0], content)
                        break
        else:
            print(f"  [SKIP]")
        time.sleep(2)

    remaining = content.count("// TODO")
    print(f"\n\nFinal remaining TODO: {remaining}")


if __name__ == "__main__":
    main()
