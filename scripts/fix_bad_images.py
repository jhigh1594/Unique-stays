#!/usr/bin/env python3
"""Revert bad image URLs back to placeholder // TODO."""
import re
from pathlib import Path

STAYS_FILE = Path("client/src/lib/stays-data.ts")

# IDs whose images were set to bad/wrong values
BAD_IDS = {
    "postcard-mount-adams-wa": "https://media.postcardcabins.com/property/mount-adams/exterior.jpg",
    "postcard-big-bear-ca": "https://media.postcardcabins.com/property/big-bear/exterior.jpg",
    "postcard-piney-woods-tx": "https://media.postcardcabins.com/property/piney-woods/exterior.jpg",
    "postcard-suches-ga": "https://media.postcardcabins.com/property/suches/exterior.jpg",
    "postcard-dale-hollow-tn": "https://media.postcardcabins.com/property/dale-hollow/exterior.jpg",
}

# Revert strategy: replace the bad image URL with a TODO placeholder
BAD_PATTERNS = [
    "cache.marriott.com/aka-fonts/ccpa/privacyoptions29x14.png",
]

content = STAYS_FILE.read_text()

# Find each listing and check its image
lines = content.split("\n")
fixed = 0
for i, line in enumerate(lines):
    if "image:" in line and any(bad in line for bad in BAD_PATTERNS):
        # Find the stay ID for this line
        stay_id = None
        for j in range(i-1, max(0, i-30), -1):
            if "  id: '" in lines[j]:
                m = re.search(r"id: '([^']+)'", lines[j])
                if m:
                    stay_id = m.group(1)
                    break
        if stay_id:
            print(f"Reverting {stay_id} (line {i+1})")
            lines[i] = re.sub(
                r"image: '[^']+',",
                f"image: 'https://a0.muscache.com/im/pictures/miso/Hosting-placeholder/original/placeholder.jpeg', // TODO",
                lines[i]
            )
            fixed += 1

content = "\n".join(lines)
STAYS_FILE.write_text(content)
print(f"Fixed {fixed} bad image URLs. Remaining TODO: {content.count('// TODO')}")
