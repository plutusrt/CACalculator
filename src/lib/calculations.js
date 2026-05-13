import {
  FED_BRACKETS, FED_STD_DED,
  CA_BRACKETS, CA_STD_DED,
  CA_MHST_THRESHOLD, CA_MHST_RATE,
  SS_WAGE_BASE, SS_RATE, MEDICARE_RATE, ADDL_MEDICARE_RATE, ADDL_MEDICARE_THRESHOLD,
  CA_SDI_RATE, RETIREMENT_401K_LIMIT,
} from '../data/tax.js';
import {
  getNeighborhood, RENT_BR_MULT, HOME_BR_MULT, STANDARD_BATHS, BATH_PREMIUM_PER_EXTRA,
} from '../data/neighborhoods.js';
import { UTILITY_ITEMS, computeUtilityDefault } from '../data/utilities.js';
import { computeVehicleCost } from '../data/vehicles.js';

/**
 * Apply progressive tax brackets to taxable income.
 */
export function taxFromBrackets(income, brackets) {
  if (income <= 0) return 0;
  let tax = 0, prev = 0;
  for (const [limit, rate] of brackets) {
    if (income <= prev) break;
    tax += (Math.min(income, limit) - prev) * rate;
    prev = limit;
  }
  return tax;
}

/**
 * Compute monthly housing cost given location, type, and size.
 */
export function computeHousing({ neighborhoodId, housingType, bedrooms, bathrooms, downPct, mortgageRate, customRent }) {
  const n = getNeighborhood(neighborhoodId);

  // User-supplied override always wins
  if (customRent && customRent > 0 && housingType === 'rent') {
    return { monthly: customRent, breakdown: { rent: customRent } };
  }

  const stdBath = STANDARD_BATHS[bedrooms] || 1;
  const extraHalfBaths = Math.max(0, Math.round((bathrooms - stdBath) / 0.5));
  const bathMultiplier = 1 + extraHalfBaths * BATH_PREMIUM_PER_EXTRA;

  if (housingType === 'rent') {
    const monthly = n.rent2br * (RENT_BR_MULT[bedrooms] || 1) * bathMultiplier;
    return { monthly, breakdown: { rent: monthly } };
  }

  // Buying
  const price = n.homePrice * (HOME_BR_MULT[bedrooms] || 1) * bathMultiplier;
  const loan = price * (1 - downPct / 100);
  const r = mortgageRate / 100 / 12;
  const n_months = 360;
  const piti = r > 0
    ? loan * (r * Math.pow(1 + r, n_months)) / (Math.pow(1 + r, n_months) - 1)
    : loan / n_months;
  const propTax = price * 0.0115 / 12;     // ~1.15% effective Bay Area rate
  const insurance = 175;
  const maintenance = price * 0.01 / 12;   // 1% of value annually
  const monthly = piti + propTax + insurance + maintenance;
  return {
    monthly,
    breakdown: { piti, propTax, insurance, maintenance, price, loan },
  };
}

/**
 * Compute total monthly utilities given household and usage.
 */
export function computeUtilities({ adults, children, bedrooms, usageMultiplier, overrides }) {
  const items = UTILITY_ITEMS.map((item) => {
    const override = overrides && overrides[item.id];
    const amount = override !== undefined && override !== null && override !== ''
      ? Number(override)
      : computeUtilityDefault(item, { adults, children, bedrooms, usageMultiplier });
    return { ...item, amount };
  });
  const total = items.reduce((sum, x) => sum + (x.amount || 0), 0);
  return { items, total };
}

/**
 * Master calculation: takes the full input state, returns derived values
 * (taxes, take-home, expense breakdown, etc.) for the Results panel.
 */
export function runCalculation(state) {
  const {
    baseSalary, bonus, rsuAnnual, retirement401kPct, filingStatus,
    adults, children, childrenInDaycare, daycareCostPerChild,
    neighborhoodId, housingType, bedrooms, bathrooms, downPct, mortgageRate, customRent,
    healthPremium, miscPerPerson, groceriesPerAdult, groceriesPerChild,
    usageMultiplier, utilityOverrides,
    vehicles,
  } = state;

  // ─── Taxes ────────────────────────────────────────────────
  const totalComp = baseSalary + bonus + rsuAnnual;
  const ret401k = Math.min(
    (baseSalary + bonus) * (retirement401kPct / 100),
    RETIREMENT_401K_LIMIT
  );

  // FICA/SDI: 401(k) does NOT reduce these
  const ficaWages = totalComp;
  const ss = Math.min(ficaWages, SS_WAGE_BASE) * SS_RATE;
  const medicare = ficaWages * MEDICARE_RATE;
  const addlMedicare = Math.max(0, ficaWages - ADDL_MEDICARE_THRESHOLD[filingStatus]) * ADDL_MEDICARE_RATE;
  const sdi = ficaWages * CA_SDI_RATE;
  const fica = ss + medicare + addlMedicare;

  // Income tax: 401(k) reduces both fed and CA taxable
  const fedTaxable = Math.max(0, totalComp - ret401k - FED_STD_DED[filingStatus]);
  const fedTax = taxFromBrackets(fedTaxable, FED_BRACKETS[filingStatus]);

  const caTaxable = Math.max(0, totalComp - ret401k - CA_STD_DED[filingStatus]);
  let caTax = taxFromBrackets(caTaxable, CA_BRACKETS[filingStatus]);
  if (caTaxable > CA_MHST_THRESHOLD) {
    caTax += (caTaxable - CA_MHST_THRESHOLD) * CA_MHST_RATE;
  }

  const totalTax = fedTax + caTax + fica + sdi;
  const takeHomeAnnual = totalComp - totalTax - ret401k;
  const takeHomeMonthly = takeHomeAnnual / 12;
  const effectiveTaxRate = totalComp > 0 ? totalTax / totalComp : 0;

  // ─── Expenses ─────────────────────────────────────────────
  const n = getNeighborhood(neighborhoodId);
  const housing = computeHousing({
    neighborhoodId, housingType, bedrooms, bathrooms, downPct, mortgageRate, customRent,
  });
  const utilities = computeUtilities({
    adults, children, bedrooms, usageMultiplier, overrides: utilityOverrides,
  });
  const childcareRate = daycareCostPerChild != null && daycareCostPerChild !== ''
    ? Number(daycareCostPerChild)
    : n.childcare;
  const childcare = childcareRate * childrenInDaycare;
  const groceries = (adults * groceriesPerAdult + children * groceriesPerChild) * n.groceryMult;
  const vehicleList = vehicles || [];
  const transportation = vehicleList.reduce((sum, v) => sum + computeVehicleCost(v).total, 0);
  const health = healthPremium;
  const misc = miscPerPerson * (adults + children);

  const totalExpenses =
    housing.monthly + utilities.total + childcare + groceries +
    transportation + health + misc;
  const leftOver = takeHomeMonthly - totalExpenses;
  const savingsRate = takeHomeMonthly > 0 ? leftOver / takeHomeMonthly : 0;

  return {
    totalComp, ret401k,
    fedTax, caTax, ss, medicare, addlMedicare, sdi, fica,
    totalTax, takeHomeAnnual, takeHomeMonthly, effectiveTaxRate,
    housing, utilities,
    childcare, groceries, transportation, health, misc,
    totalExpenses, leftOver, savingsRate,
    neighborhood: n,
  };
}
