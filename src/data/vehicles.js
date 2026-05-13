// Vehicle cost data, calibrated to 2026 Bay Area averages.
//
// Lease payments use the 1% of MSRP rule of thumb (Vantage Auto Group, 2026).
// Finance payments assume 60-month loan, 7% APR, 10% down on category MSRP.
// Insurance reflects Bay Area full-coverage averages (higher than CA $260/mo
// state avg due to urban congestion and vehicle theft rates).
// Fuel/charging assumes 10,000 miles/year and CA gas ~$5/gal or PG&E rates.

export const CAR_TYPES = [
  {
    id: 'compact',
    label: 'Compact',
    examples: 'Civic, Corolla, Mazda3',
    msrp: 28000,
    leasePayment: 300,
    financePayment: 475,
    insurance: 180,
    fuel: 130,
  },
  {
    id: 'midsize',
    label: 'Midsize sedan',
    examples: 'Accord, Camry, Model 3',
    msrp: 35000,
    leasePayment: 450,
    financePayment: 625,
    insurance: 200,
    fuel: 175,
  },
  {
    id: 'suv',
    label: 'SUV / Crossover',
    examples: 'RAV4, CR-V, Model Y',
    msrp: 42000,
    leasePayment: 550,
    financePayment: 750,
    insurance: 220,
    fuel: 210,
  },
  {
    id: 'luxury',
    label: 'Luxury',
    examples: 'BMW 3, Audi A4, X5',
    msrp: 60000,
    leasePayment: 750,
    financePayment: 1050,
    insurance: 290,
    fuel: 250,
  },
];

export const OWNERSHIPS = [
  { id: 'lease', label: 'Lease' },
  { id: 'finance', label: 'Finance' },
  { id: 'owned', label: 'Owned' },   // paid off — only insurance + fuel
];

export function getCarType(id) {
  return CAR_TYPES.find((t) => t.id === id) || CAR_TYPES[1];
}

/**
 * Compute monthly cost for a single vehicle entry.
 * Returns: { payment, insurance, fuel, total }
 */
export function computeVehicleCost(vehicle) {
  const t = getCarType(vehicle.type);
  let payment = 0;
  if (vehicle.ownership === 'lease') payment = t.leasePayment;
  else if (vehicle.ownership === 'finance') payment = t.financePayment;
  // 'owned' = $0 payment
  return {
    payment,
    insurance: t.insurance,
    fuel: t.fuel,
    total: payment + t.insurance + t.fuel,
  };
}
