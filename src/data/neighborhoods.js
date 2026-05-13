// Neighborhood-level cost-of-living data for major California metros.
//
// Estimates reflect 2025-2026 Bay Area rents and home prices based on Zillow,
// Apartments.com, Redfin, and local market reports. Numbers will drift; the
// intent is to give relocation candidates a realistic relative picture across
// neighborhoods, not appraisal-grade precision.
//
// Fields:
//   rent2br      = median 2BR/1.5BA rent ($/mo)
//   homePrice    = median single-family home price (3BR baseline)
//   childcare    = monthly full-time daycare per child
//   groceryMult  = grocery cost multiplier vs LA baseline (1.0)

const N = (id, city, name, rent2br, homePrice, childcare, groceryMult) =>
  ({ id, city, name, rent2br, homePrice, childcare, groceryMult });

export const NEIGHBORHOODS = [
  // ─── Sunnyvale ──────────────────────────────────────────────
  N('sv-cherry-chase',    'Sunnyvale', 'Cherry Chase',         4500, 2100000, 2500, 1.08),
  N('sv-cumberland',      'Sunnyvale', 'Cumberland',           4500, 2100000, 2500, 1.08),
  N('sv-heritage',        'Sunnyvale', 'Heritage District',    4000, 1750000, 2400, 1.08),
  N('sv-west',            'Sunnyvale', 'Sunnyvale West',       3900, 1650000, 2400, 1.08),
  N('sv-lakewood',        'Sunnyvale', 'Lakewood Village',     3800, 1550000, 2300, 1.08),
  N('sv-birdland',        'Sunnyvale', 'Birdland',             3700, 1500000, 2300, 1.08),
  N('sv-ortega',          'Sunnyvale', 'Ortega Park',          3700, 1600000, 2400, 1.08),
  N('sv-ponderosa',       'Sunnyvale', 'Ponderosa',            3400, 1450000, 2300, 1.08),
  N('sv-raynor',          'Sunnyvale', 'Raynor',               3600, 1500000, 2300, 1.08),
  N('sv-avg',             'Sunnyvale', 'Anywhere in Sunnyvale',3900, 1650000, 2400, 1.08),

  // ─── Mountain View ──────────────────────────────────────────
  N('mv-old',             'Mountain View', 'Old Mountain View',  4400, 1900000, 2500, 1.08),
  N('mv-cuesta',          'Mountain View', 'Cuesta Park',        4500, 2050000, 2500, 1.08),
  N('mv-castro',          'Mountain View', 'Castro City',        4200, 1700000, 2400, 1.08),
  N('mv-whisman',         'Mountain View', 'Whisman / Slater',   3800, 1500000, 2300, 1.08),
  N('mv-rex',             'Mountain View', 'Rex Manor',          4000, 1650000, 2400, 1.08),
  N('mv-sylvan',          'Mountain View', 'Sylvan Park',        3900, 1600000, 2400, 1.08),
  N('mv-shoreline',       'Mountain View', 'Shoreline West',     4000, 1700000, 2400, 1.08),
  N('mv-avg',             'Mountain View', 'Anywhere in Mtn View', 4100, 1700000, 2400, 1.08),

  // ─── Palo Alto ──────────────────────────────────────────────
  N('pa-old',             'Palo Alto', 'Old Palo Alto',        5500, 3500000, 2700, 1.10),
  N('pa-crescent',        'Palo Alto', 'Crescent Park',        5200, 3300000, 2700, 1.10),
  N('pa-midtown',         'Palo Alto', 'Midtown',              4500, 2400000, 2600, 1.10),
  N('pa-barron',          'Palo Alto', 'Barron Park',          4300, 2300000, 2600, 1.10),
  N('pa-ventura',         'Palo Alto', 'Ventura',              4100, 2100000, 2500, 1.10),
  N('pa-college',         'Palo Alto', 'College Terrace',      4400, 2400000, 2600, 1.10),
  N('pa-downtown',        'Palo Alto', 'Downtown Palo Alto',   4800, 2600000, 2600, 1.10),
  N('pa-avg',             'Palo Alto', 'Anywhere in Palo Alto',4600, 2500000, 2600, 1.10),

  // ─── Cupertino ──────────────────────────────────────────────
  N('cu-monta-vista',     'Cupertino', 'Monta Vista',          4200, 2400000, 2500, 1.08),
  N('cu-rancho',          'Cupertino', 'Rancho Rinconada',     4000, 2200000, 2500, 1.08),
  N('cu-vallco',          'Cupertino', 'Cupertino-Vallco',     3800, 2050000, 2400, 1.08),
  N('cu-avg',             'Cupertino', 'Anywhere in Cupertino',4000, 2200000, 2500, 1.08),

  // ─── Santa Clara ────────────────────────────────────────────
  N('sc-old-quad',        'Santa Clara', 'Old Quad',           3600, 1700000, 2400, 1.07),
  N('sc-rivermark',       'Santa Clara', 'Rivermark',          3800, 1750000, 2400, 1.07),
  N('sc-north',           'Santa Clara', 'North Santa Clara',  3400, 1600000, 2300, 1.07),
  N('sc-central',         'Santa Clara', 'Central Santa Clara',3300, 1550000, 2300, 1.07),
  N('sc-avg',             'Santa Clara', 'Anywhere in Santa Clara', 3500, 1650000, 2400, 1.07),

  // ─── San Jose ───────────────────────────────────────────────
  N('sj-willow-glen',     'San Jose', 'Willow Glen',           4000, 1800000, 2300, 1.06),
  N('sj-almaden',         'San Jose', 'Almaden Valley',        4200, 1950000, 2300, 1.06),
  N('sj-cambrian',        'San Jose', 'Cambrian Park',         3500, 1600000, 2200, 1.06),
  N('sj-rose-garden',     'San Jose', 'Rose Garden',           3800, 1700000, 2300, 1.06),
  N('sj-naglee',          'San Jose', 'Naglee Park',           3500, 1650000, 2200, 1.06),
  N('sj-japantown',       'San Jose', 'Japantown',             3400, 1450000, 2200, 1.06),
  N('sj-downtown',        'San Jose', 'Downtown San Jose',     3300, 1300000, 2200, 1.06),
  N('sj-berryessa',       'San Jose', 'Berryessa / North SJ',  3000, 1400000, 2100, 1.06),
  N('sj-evergreen',       'San Jose', 'Evergreen',             3200, 1500000, 2200, 1.06),
  N('sj-santana',         'San Jose', 'Santana Row / West SJ', 3800, 1700000, 2300, 1.06),
  N('sj-alum-rock',       'San Jose', 'Alum Rock',             2400,  900000, 1900, 1.06),
  N('sj-east',            'San Jose', 'East San Jose',         2600, 1000000, 2000, 1.06),
  N('sj-avg',             'San Jose', 'Anywhere in San Jose',  3300, 1450000, 2200, 1.06),

  // ─── Los Altos ──────────────────────────────────────────────
  N('la-old',             'Los Altos', 'Old Los Altos',        5200, 3200000, 2700, 1.10),
  N('la-north',           'Los Altos', 'North Los Altos',      4800, 2800000, 2600, 1.10),
  N('la-loyola',          'Los Altos', 'Loyola Corners',       4500, 2600000, 2600, 1.10),
  N('la-avg',             'Los Altos', 'Anywhere in Los Altos',4800, 2900000, 2700, 1.10),

  // ─── Menlo Park ─────────────────────────────────────────────
  N('mp-allied',          'Menlo Park', 'Allied Arts',         5000, 2800000, 2600, 1.10),
  N('mp-linfield',        'Menlo Park', 'Linfield Oaks',       4500, 2400000, 2500, 1.10),
  N('mp-belle-haven',     'Menlo Park', 'Belle Haven',         3500, 1500000, 2300, 1.08),
  N('mp-avg',             'Menlo Park', 'Anywhere in Menlo Park', 4400, 2300000, 2500, 1.10),

  // ─── Redwood City ───────────────────────────────────────────
  N('rwc-friendly',       'Redwood City', 'Friendly Acres',    3400, 1500000, 2300, 1.07),
  N('rwc-mt-carmel',      'Redwood City', 'Mt Carmel',         3800, 1700000, 2400, 1.07),
  N('rwc-emerald',        'Redwood City', 'Emerald Hills',     4200, 2100000, 2400, 1.07),
  N('rwc-downtown',       'Redwood City', 'Downtown RWC',      3500, 1500000, 2300, 1.07),
  N('rwc-avg',            'Redwood City', 'Anywhere in Redwood City', 3700, 1700000, 2400, 1.07),

  // ─── Fremont ────────────────────────────────────────────────
  N('fr-mission',         'Fremont', 'Mission San Jose',       3800, 1900000, 2200, 1.05),
  N('fr-niles',           'Fremont', 'Niles',                  3200, 1450000, 2100, 1.05),
  N('fr-centerville',     'Fremont', 'Centerville',            3000, 1400000, 2100, 1.05),
  N('fr-ardenwood',       'Fremont', 'Ardenwood',              3400, 1600000, 2200, 1.05),
  N('fr-avg',             'Fremont', 'Anywhere in Fremont',    3300, 1550000, 2150, 1.05),

  // ─── Other South Bay ────────────────────────────────────────
  N('campbell',           'Campbell',  'Campbell',             3400, 1600000, 2200, 1.06),
  N('los-gatos',          'Los Gatos', 'Los Gatos',            4500, 2400000, 2500, 1.08),
  N('saratoga',           'Saratoga',  'Saratoga',             4800, 2900000, 2600, 1.08),
  N('milpitas',           'Milpitas',  'Milpitas',             3000, 1450000, 2100, 1.05),

  // ─── Mid-Peninsula ──────────────────────────────────────────
  N('belmont',            'Belmont',   'Belmont',              3700, 1900000, 2400, 1.08),
  N('san-mateo-central',  'San Mateo', 'Central San Mateo',    3500, 1700000, 2400, 1.08),
  N('san-mateo-hayward-park','San Mateo','Hayward Park',       3700, 1850000, 2400, 1.08),
  N('san-mateo-hillsdale','San Mateo', 'Hillsdale',            3600, 1800000, 2400, 1.08),
  N('foster-city',        'Foster City','Foster City',         3800, 1900000, 2400, 1.08),
  N('burlingame',         'Burlingame','Burlingame',           4200, 2200000, 2500, 1.09),

  // ─── San Francisco ──────────────────────────────────────────
  N('sf-mission',         'San Francisco', 'Mission',          4200, 1700000, 2500, 1.10),
  N('sf-marina',          'San Francisco', 'Marina',           5200, 2200000, 2700, 1.10),
  N('sf-hayes',           'San Francisco', 'Hayes Valley',     4500, 1800000, 2600, 1.10),
  N('sf-noe',             'San Francisco', 'Noe Valley',       4800, 2200000, 2600, 1.10),
  N('sf-soma',            'San Francisco', 'SoMa',             4000, 1500000, 2500, 1.10),
  N('sf-sunset',          'San Francisco', 'Sunset',           3800, 1700000, 2400, 1.10),
  N('sf-richmond',        'San Francisco', 'Richmond',         3800, 1750000, 2400, 1.10),
  N('sf-pac-heights',     'San Francisco', 'Pacific Heights',  5500, 2800000, 2700, 1.10),
  N('sf-avg',             'San Francisco', 'Anywhere in SF',   4200, 1800000, 2500, 1.10),

  // ─── East Bay ───────────────────────────────────────────────
  N('oak-rockridge',      'Oakland',   'Rockridge',            3800, 1450000, 2200, 1.05),
  N('oak-lake-merritt',   'Oakland',   'Lake Merritt',         3200, 1100000, 2100, 1.05),
  N('oak-temescal',       'Oakland',   'Temescal',             3400, 1200000, 2100, 1.05),
  N('oak-avg',            'Oakland',   'Anywhere in Oakland',  3200, 1100000, 2100, 1.05),
  N('berkeley',           'Berkeley',  'Berkeley',             3600, 1500000, 2300, 1.06),
  N('alameda',            'Alameda',   'Alameda',              3200, 1300000, 2100, 1.05),

  // ─── Other CA metros ───────────────────────────────────────
  N('la-santa-monica',    'Los Angeles','Santa Monica',        3800, 2000000, 2000, 1.00),
  N('la-west',            'Los Angeles','West LA',             3500, 1700000, 1900, 1.00),
  N('la-pasadena',        'Los Angeles','Pasadena',            3200, 1500000, 1900, 1.00),
  N('la-dtla',            'Los Angeles','Downtown LA',         2800, 1100000, 1800, 1.00),
  N('la-silver-lake',     'Los Angeles','Silver Lake',         3000, 1400000, 1800, 1.00),
  N('la-avg',             'Los Angeles','Anywhere in LA',      3000,  950000, 1800, 1.00),

  N('oc-irvine',          'Orange County','Irvine',            3400, 1400000, 1900, 1.02),
  N('oc-newport',         'Orange County','Newport Beach',     4200, 2200000, 2100, 1.02),
  N('oc-costa-mesa',      'Orange County','Costa Mesa',        3000, 1200000, 1800, 1.02),
  N('oc-avg',             'Orange County','Anywhere in OC',    3200, 1200000, 1900, 1.02),

  N('sd-la-jolla',        'San Diego', 'La Jolla',             3800, 2100000, 1900, 1.00),
  N('sd-carmel',          'San Diego', 'Carmel Valley',        3400, 1500000, 1800, 1.00),
  N('sd-mission-valley',  'San Diego', 'Mission Valley',       2800, 1000000, 1700, 1.00),
  N('sd-downtown',        'San Diego', 'Downtown SD',          3000, 1100000, 1700, 1.00),
  N('sd-avg',             'San Diego', 'Anywhere in San Diego',3000,  950000, 1700, 1.00),

  N('sac-midtown',        'Sacramento','Midtown',              2400,  600000, 1500, 0.92),
  N('sac-east',           'Sacramento','East Sacramento',      2500,  700000, 1500, 0.92),
  N('sac-land-park',      'Sacramento','Land Park',            2600,  750000, 1500, 0.92),
  N('sac-avg',            'Sacramento','Anywhere in Sacramento', 2200, 550000, 1400, 0.92),

  N('ie-avg',             'Inland Empire','Anywhere in IE',    2300,  600000, 1450, 0.92),
];

// Multipliers vs 2BR baseline (rent and home price scale with bedrooms)
export const RENT_BR_MULT = { 1: 0.72, 2: 1.0, 3: 1.32, 4: 1.65 };
export const HOME_BR_MULT = { 1: 0.62, 2: 0.85, 3: 1.0, 4: 1.25 };

// Bathroom premium: standard count assumed per bedroom; extras add %
export const STANDARD_BATHS = { 1: 1, 2: 1.5, 3: 2, 4: 2.5 };
export const BATH_PREMIUM_PER_EXTRA = 0.05; // 5% per extra half-bath

// Group neighborhoods by city for the dropdown UX
export function groupByCity(neighborhoods) {
  const groups = new Map();
  for (const n of neighborhoods) {
    if (!groups.has(n.city)) groups.set(n.city, []);
    groups.get(n.city).push(n);
  }
  return Array.from(groups.entries());
}

export function getNeighborhood(id) {
  return NEIGHBORHOODS.find(n => n.id === id) || NEIGHBORHOODS[0];
}
