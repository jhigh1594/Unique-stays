#!/usr/bin/env python3
import json, re
from pathlib import Path

for name in ['postcard-mount-adams-wa', 'postcard-big-bear-ca', 'postcard-hocking-hills-oh', 'postcard-catskills-ny']:
    path = Path(f'.firecrawl/direct-{name}.json')
    if not path.exists():
        print(f'{name}: not found')
        continue
    with open(path) as f:
        d = json.load(f)
    md = d.get('metadata', {})
    print(f'=== {name} ===')
    print(f'ogImage: {md.get("ogImage", "N/A")}')
    print(f'og:image: {md.get("og:image", "N/A")}')
    print(f'title: {md.get("title", "N/A")}')
    # Check for real JPG/PNG images in markdown
    all_imgs = re.findall(r'!\[.*?\]\((https://[^\)]+\.(?:jpg|jpeg|png|webp))[^\)]*\)', d.get('markdown', ''))
    real_imgs = [u for u in all_imgs if not any(kw in u.lower() for kw in ['logo', 'icon', 'flag', 'favicon', 'avatar', 'ccpa', 'fonts', 'sprite'])]
    print(f'Real images: {len(real_imgs)}')
    for u in real_imgs[:5]:
        print(f'  {u[:120]}')
    print()
