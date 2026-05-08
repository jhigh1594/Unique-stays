#!/usr/bin/env python3
import json, re
from pathlib import Path

for name in ['airbnb-meadowlark-treehouse-mt', 'airbnb-rocky-mountain-treehouse-co']:
    path = Path(f'.firecrawl/{name}.json')
    with open(path) as f:
        d = json.load(f)
    md = d.get('markdown', '')
    links = d.get('links', [])

    # Check all muscache URLs
    urls = re.findall(r'https://a0\.muscache\.com[^\s\)\"\' ]+', md)
    listing_imgs = [u for u in urls if 'miso/Hosting' in u]

    print(f'=== {name} ===')
    print(f'Total a0.muscache URLs: {len(urls)}')
    print(f'Listing (miso/Hosting) URLs: {len(listing_imgs)}')
    for u in listing_imgs[:3]:
        print(f'  {u[:120]}')

    # Check links section
    link_urls = []
    for link in links:
        url = link if isinstance(link, str) else link.get('url', '')
        if 'a0.muscache.com' in url and 'miso/Hosting' in url:
            link_urls.append(url)
    print(f'Links section miso/Hosting: {len(link_urls)}')
    for u in link_urls[:3]:
        print(f'  {u[:120]}')

    print(f'Page title: {d.get("metadata", {}).get("title", "N/A")}')
    print(f'First 400 chars: {md[:400]}')
    print()
