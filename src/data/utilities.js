// Bay Area average household utility costs (monthly), 2025-2026 estimates.
// Sources: PG&E rate filings, Bay Area municipal water districts (Valley Water,
// SCVWD), Comcast/AT&T residential pricing, typical mobile carrier costs.
//
// Each item has either a flat amount, or a base + scaling components:
//   - perPerson: scales with total household size (adults + children)
//   - perBedroom: scales with bedrooms (proxy for square footage)
//   - perAdult: scales with adults only (mobile lines)
//   - variable: subject to the household-wide usage multiplier
//                (electric/gas/water vary with consumption; internet/garbage don't)

export const UTILITY_ITEMS = [
  {
    id: 'electric',
    label: 'Electric (PG&E)',
    base: 75,
    perPerson: 30,
    perBedroom: 22,
    variable: true,
  },
  {
    id: 'gas',
    label: 'Natural gas (PG&E)',
    base: 30,
    perPerson: 10,
    perBedroom: 9,
    variable: true,
  },
  {
    id: 'water',
    label: 'Water & sewer',
    base: 55,
    perPerson: 16,
    perBedroom: 0,
    variable: true,
  },
  {
    id: 'garbage',
    label: 'Garbage & recycling',
    flat: 45,
    variable: false,
  },
  {
    id: 'internet',
    label: 'Internet',
    flat: 80,
    variable: false,
  },
  {
    id: 'mobile',
    label: 'Mobile (per adult)',
    perAdult: 55,
    variable: false,
  },
  {
    id: 'streaming',
    label: 'Streaming & subscriptions',
    flat: 60,
    variable: false,
  },
];

// Compute default monthly cost for one utility line given household
export function computeUtilityDefault(item, { adults, children, bedrooms, usageMultiplier }) {
  const householdSize = adults + children;
  let amount = 0;
  if (item.flat) amount += item.flat;
  if (item.base) amount += item.base;
  if (item.perPerson) amount += item.perPerson * householdSize;
  if (item.perAdult) amount += item.perAdult * adults;
  if (item.perBedroom) amount += item.perBedroom * bedrooms;
  if (item.variable) amount *= usageMultiplier;
  return Math.round(amount);
}

// Preset usage levels
export const USAGE_PRESETS = [
  { id: 'efficient', label: 'Efficient', multiplier: 0.8, description: '−20%' },
  { id: 'average', label: 'Average', multiplier: 1.0, description: 'Bay Area avg' },
  { id: 'heavy', label: 'Heavy', multiplier: 1.25, description: '+25%' },
  { id: 'high', label: 'Very heavy', multiplier: 1.5, description: '+50%' },
];
