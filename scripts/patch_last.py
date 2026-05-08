#!/usr/bin/env python3
import re
from pathlib import Path

STAYS_FILE = Path("client/src/lib/stays-data.ts")
content = STAYS_FILE.read_text()

# Fix postcard-hocking-hills-oh with Marriott og:image (strip query params)
img_url = "https://cache.marriott.com/is/image/marriotts7prod/oc-cmhhh-cabin-exterior-26962:Wide-Hor"

lines = content.split("\n")
in_stay = False
for i, line in enumerate(lines):
    if "id: 'postcard-hocking-hills-oh'," in line:
        in_stay = True
    if in_stay and "// TODO" in line and "image:" in line:
        lines[i] = re.sub(r"image: '[^']+',(\s*// TODO[^\n]*)", f"image: '{img_url}',", line)
        print(f"Fixed L{i+1}: {img_url}")
        break

content = "\n".join(lines)
STAYS_FILE.write_text(content)
print(f"Remaining TODO: {content.count('// TODO')}")
