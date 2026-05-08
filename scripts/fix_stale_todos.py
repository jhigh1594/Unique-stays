#!/usr/bin/env python3
"""Remove stale // TODO comments from image lines that already have real URLs."""
import re
from pathlib import Path

STAYS_FILE = Path("client/src/lib/stays-data.ts")
content = STAYS_FILE.read_text()
lines = content.split("\n")

fixed = 0
for i, line in enumerate(lines):
    if "// TODO" in line and "image:" in line:
        img_match = re.search(r"image: '([^']+)'", line)
        if img_match:
            url = img_match.group(1)
            # If URL is NOT a placeholder, just strip the TODO comment
            if "placeholder" not in url.lower():
                print(f"L{i+1}: Removing stale TODO from: {url[:80]}")
                lines[i] = re.sub(r",\s*// TODO.*$", ",", line)
                fixed += 1

content = "\n".join(lines)
STAYS_FILE.write_text(content)
print(f"\nFixed {fixed} stale TODO comments. Remaining TODO: {content.count('// TODO')}")
