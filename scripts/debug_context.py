#!/usr/bin/env python3
import json, re

# Check context around the miso URL in the working test
with open('.firecrawl/airbnb-test.json') as f:
    d = json.load(f)
md = d.get('markdown', '')

# Find the line with miso/Hosting
lines = md.split('\n')
for i, line in enumerate(lines):
    if 'miso/Hosting' in line:
        start = max(0, i-3)
        end = min(len(lines), i+4)
        print(f'Context around miso/Hosting URL (lines {start}-{end}):')
        for j in range(start, end):
            print(f'  L{j}: {lines[j][:200]}')
        print()

# Check og:image in metadata
print('Metadata og:image:', d.get('metadata', {}).get('ogImage', 'N/A'))
print('Metadata og:image:', d.get('metadata', {}).get('og:image', 'N/A'))

# Check meadowlark metadata
print()
with open('.firecrawl/airbnb-meadowlark-treehouse-mt.json') as f:
    d2 = json.load(f)
print('Meadowlark og:image:', d2.get('metadata', {}).get('ogImage', 'N/A'))
print('Meadowlark og:image:', d2.get('metadata', {}).get('og:image', 'N/A'))
