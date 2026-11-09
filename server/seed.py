#!/usr/bin/env python3
"""Seed the TXUS centralized pricing database with species rates, pricing meta, and products."""
import openpyxl, re, datetime, json
import pymysql

DB = dict(host='127.0.0.1', user='txus', passwd='txuspass', db='txus_dev', charset='utf8mb4')
WB = '/home/ubuntu/txus-inventory/txus-inventory-master.xlsx'

NOW = datetime.datetime.now(datetime.timezone.utc).isoformat()
DATE = datetime.datetime.now().strftime('%Y-%m-%d')

# ---------------------------------------------------------------------------
# 1. Canonical species map
# ---------------------------------------------------------------------------
def canonical(s):
    if not s: return ''
    s = str(s).strip()
    s = re.sub(r'\s*-\s*(Marvin|Series|115 years|70 year).*', '', s, flags=re.I)
    s = re.sub(r'\s*\(AFD Plaque\)', '', s)
    s = re.sub(r'\s+Burl\s+Cookies?', '', s, flags=re.I)
    s = re.sub(r'\s+Cookies?', '', s, flags=re.I)
    s = s.replace('CHERRY', 'Cherry')
    return s.strip()

# ---------------------------------------------------------------------------
# 2. Extract species and products from master workbook
# ---------------------------------------------------------------------------
wb = openpyxl.load_workbook(WB, data_only=True)
ws = wb['Master Inventory']
rows = list(ws.iter_rows(values_only=True))
hdr = [str(c) if c is not None else '' for c in rows[0]]

def g(r, col):
    try:
        i = hdr.index(col)
        v = r[i]
        return (str(v) if v is not None else '').strip()
    except (ValueError, IndexError):
        return ''

products = []
species_map = {}  # raw -> canonical
for r in rows[1:]:
    pid = g(r, 'Product ID')
    if not pid: continue
    raw_sp = g(r, 'Species')
    can_sp = canonical(raw_sp)
    species_map[raw_sp] = can_sp
    products.append(dict(
        id=pid,
        category=g(r, 'Category'),
        species=raw_sp,
        lengthIn=g(r, 'Length (in)'),
        widthMinIn=g(r, 'Width Min (in)'),
        widthMaxIn=g(r, 'Width Max (in)'),
        averageWidthIn=g(r, 'Average Width (in)'),
        thicknessIn=g(r, 'Thickness (in)'),
        boardFeet=g(r, 'Board Feet (BF)'),
        pricingMethodDefault=g(r, 'Pricing Method'),
        sourcePrice=g(r, 'Source Price ($)'),
        location=g(r, 'Location'),
        notes=g(r, 'Notes'),
        pictureReference=g(r, 'Picture Reference'),
        primaryImage=g(r, 'Primary Image'),
        allImages=g(r, 'All Images'),
        imageCount=g(r, 'Image Count'),
        imageStatus=g(r, 'Image Status') or 'IMAGE_LINKED',
        publicListing=g(r, 'Public Listing') or 'YES',
    ))

canonical_species = sorted(set(s for s in species_map.values() if s))

conn = pymysql.connect(**DB)
cur = conn.cursor()

# ---------------------------------------------------------------------------
# 3. Seed pricingMeta
# ---------------------------------------------------------------------------
meta = [
    ('defaultBoardFootRate', '12.00'),
    ('pricingVersion', NOW),
    ('pricingUpdated', NOW),
    ('pricingServiceStatus', 'operational'),
]
for k, v in meta:
    cur.execute("INSERT INTO pricingMeta (metaKey, metaValue) VALUES (%s,%s) ON DUPLICATE KEY UPDATE metaValue=VALUES(metaValue), updatedAt=NOW()", (k, v))

# ---------------------------------------------------------------------------
# 4. Seed speciesPricing (20 canonical species, all at Dev's $12/BF working rate)
# ---------------------------------------------------------------------------
cur.execute("DELETE FROM speciesPricingHistory")
cur.execute("DELETE FROM speciesPricing")
cur.execute("DELETE FROM productPricingOverrides")

for sp in canonical_species:
    cur.execute("""INSERT INTO speciesPricing (species, boardFootRate, pricingMethod, status, effectiveDate, notes)
                    VALUES (%s,%s,%s,%s,%s,%s)""",
                (sp, '12.00', 'board_foot', 'active', DATE, 'Imported from TXUS Master Inventory'))
    sp_id = cur.lastrowid
    cur.execute("""INSERT INTO speciesPricingHistory (speciesPricingId, species, oldRate, newRate, oldMethod, newMethod, changedBy, changeReason)
                    VALUES (%s,%s,%s,%s,%s,%s,%s,%s)""",
                (sp_id, sp, None, '12.00', None, 'board_foot', 'system', 'Initial rate import — Dev working rate of $12/BF'))

# One example product override for demonstration: Clearance override on 108-010
cur.execute("""INSERT INTO productPricingOverrides (productId, pricingMethod, boardFootRateOverride, overrideReason, active)
               VALUES (%s,%s,%s,%s,1)""",
            ('108-010', 'board_foot', '10.00', 'Clearance pricing — special piece override'))

# ---------------------------------------------------------------------------
# 5. Seed products
# ---------------------------------------------------------------------------
cur.execute("DELETE FROM products")
for p in products:
    img_cnt = 0
    try:
        img_cnt = int(float(p['imageCount'] or 0))
    except ValueError: pass
    cur.execute("""INSERT INTO products (id, category, species, lengthIn, widthMinIn, widthMaxIn, averageWidthIn, thicknessIn, boardFeet, pricingMethodDefault, sourcePrice, location, notes, primaryImage, allImages, imageCount, imageStatus, publicListing, status)
                    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
                (p['id'], p['category'], p['species'], p['lengthIn'] or None, p['widthMinIn'] or None,
                 p['widthMaxIn'] or None, p['averageWidthIn'] or None, p['thicknessIn'] or None,
                 p['boardFeet'] or None, p['pricingMethodDefault'] or None, p['sourcePrice'] or None,
                 p['location'] or None, p['notes'] or None, p['primaryImage'] or None, p['allImages'] or None,
                 img_cnt, p['imageStatus'], p['publicListing'], 'available'))

conn.commit()
cur.execute("SELECT count(*) FROM speciesPricing")
print('speciesPricing:', cur.fetchone()[0])
cur.execute("SELECT count(*) FROM products")
print('products:', cur.fetchone()[0])
cur.execute("SELECT count(*) FROM pricingMeta")
print('pricingMeta:', cur.fetchone()[0])
cur.close()
conn.close()
print('DONE seeding')
