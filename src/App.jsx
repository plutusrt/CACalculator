import { useEffect, useMemo, useCallback } from 'react';
import { useLocalStorage } from './lib/useLocalStorage.js';
import { runCalculation } from './lib/calculations.js';
import CompCard from './components/CompCard.jsx';
import HouseholdCard from './components/HouseholdCard.jsx';
import LocationCard from './components/LocationCard.jsx';
import UtilitiesCard from './components/UtilitiesCard.jsx';
import VehiclesCard from './components/VehiclesCard.jsx';
import Results from './components/Results.jsx';

const DEFAULT_STATE = {
  // Compensation
  baseSalary: 180000,
  bonus: 25000,
  rsuAnnual: 60000,
  retirement401kPct: 10,
  filingStatus: 'mfj',

  // Household
  adults: 2,
  children: 1,
  childrenInDaycare: 1,
  healthPremium: 500,
  groceriesPerAdult: 425,
  groceriesPerChild: 275,
  daycareCostPerChild: null,

  // Location & housing
  neighborhoodId: 'sv-avg',
  housingType: 'rent',
  bedrooms: 2,
  bathrooms: 2,
  downPct: 20,
  mortgageRate: 7.0,
  customRent: null,

  // Utilities
  usageMultiplier: 1.0,
  utilityOverrides: {},

  // Vehicles (replaces flat transportation)
  vehicles: [
    { type: 'midsize', ownership: 'finance' },
    { type: 'suv', ownership: 'lease' },
  ],

  // Other expenses
  miscPerPerson: 250,
};

export default function App() {
  const [state, setState] = useLocalStorage('ca-calc-state', DEFAULT_STATE);
  const [theme, setTheme] = useLocalStorage('ca-calc-theme', null);

  // Apply theme to document root
  useEffect(() => {
    const resolved = theme || (
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    );
    document.documentElement.setAttribute('data-theme', resolved);
  }, [theme]);

  // Migrate any partial state from previous saves (add new defaults)
  useEffect(() => {
    let needsUpdate = false;
    const merged = { ...DEFAULT_STATE };
    for (const k of Object.keys(DEFAULT_STATE)) {
      if (state[k] === undefined) needsUpdate = true;
      else merged[k] = state[k];
    }
    if (needsUpdate) setState(merged);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = useCallback((patch) => {
    setState((s) => ({ ...s, ...patch }));
  }, [setState]);

  const calc = useMemo(() => runCalculation(state), [state]);

  const currentTheme = theme || (
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light'
  );

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="container">
          <div className="header-row">
            <div>
              <div className="header-eyebrow">California Relocation</div>
              <h1 className="header-title display">
                Cost-of-Living &<br />
                <em>Take-Home Calculator</em>
              </h1>
            </div>
            <ThemeToggle theme={currentTheme} setTheme={setTheme} />
          </div>
          <p className="header-sub">
            Plug in total comp, family, and target neighborhood. Get realistic numbers
            for what lands in your account each month and what's left after California's
            actual cost of living takes its share.
          </p>
        </div>
      </header>

      <main className="app-main">
        {/* Input cards */}
        <div className="container">
          <div className="cards-grid">
            <CompCard state={state} set={set} calc={calc} />
            <HouseholdCard state={state} set={set} calc={calc} />
            <LocationCard state={state} set={set} calc={calc} />
            <UtilitiesCard state={state} set={set} calc={calc} />
            <VehiclesCard state={state} set={set} />
          </div>
        </div>

        {/* Results */}
        <Results calc={calc} neighborhood={calc.neighborhood} />

        {/* Footnote */}
        <div className="container">
          <div className="footnote">
            <p>
              <strong>Tax assumptions:</strong> 2026 federal brackets and standard
              deductions ($16,100 single / $32,200 MFJ). California uses 2025 FTB
              brackets (2026 not yet finalized) with 2026 standard deductions ($5,706
              single / $11,412 MFJ). 401(k) cap of $24,500 (2026). Social Security
              wage base $184,500 (2026). RSUs treated as ordinary income at vest.
              401(k) reduces federal &amp; CA taxable income but not FICA wages.
              CA SDI 1.1% on all wages, no cap. Mental Health Services Tax (+1%)
              applies to taxable income over $1M.
            </p>
            <p>
              <strong>Cost assumptions:</strong> Rent and home prices are 2025-2026
              estimates by neighborhood. Mortgage payment includes principal,
              interest, ~1.15% effective property tax, $175/mo insurance, and 1%/yr
              maintenance reserve. Childcare reflects full-time daycare costs.
              Utilities default to Bay Area averages (PG&amp;E, Valley Water, typical
              residential internet/mobile) and scale with household size, bedrooms,
              and your usage selector.
            </p>
            <p>
              This is an estimate, not tax or financial advice. Real numbers depend
              on itemized deductions, HSA/FSA contributions, dependent care credits,
              the child tax credit, RSU withholding shortfalls, AMT, employer benefits,
              and many other factors. Verify with a CPA before making large decisions.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function ThemeToggle({ theme, setTheme }) {
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
          Light
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          Dark
        </>
      )}
    </button>
  );
}
