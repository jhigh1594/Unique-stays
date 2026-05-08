#!/usr/bin/env python3
import json, re

# Check both the original test and the new ravens-nest scrape
for path in ['.firecrawl/airbnb-test.json', '.firecrawl/airbnb-ravens-nest-treehouse-mt.json']:
    with open(path) as f:
        d = json.load(f)
    md = d.get('markdown', '')
    links = d.get('links', [])

    miso_urls = [u for u in re.findall(r'https://a0\.muscache\.com[^\s\)\"\' ]+', md) if 'miso/Hosting' in u]

    print(f'=== {path} ===')
    print(f'Markdown miso/Hosting: {len(miso_urls)}')
    for u in miso_urls[:3]:
        print(f'  {u[:120]}')

    # Links type
    print(f'Links type: {type(links).__name__}, count: {len(links)}')
    if links and isinstance(links[0], dict):
        link_urls = [l.get('url','') for l in links if 'a0.muscache' in l.get('url','') and 'miso' in l.get('url','')]
    else:
        link_urls = [l for l in links if isinstance(l, str) and 'a0.muscache' in l and 'miso' in l]
    print(f'Links miso URLs: {len(link_urls)}')
    print()
