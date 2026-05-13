# California Relocation Calculator

A take-home pay and cost-of-living calculator for people considering a move to
California. Built around what actually moves the number: tax stack (federal +
CA + FICA + SDI), neighborhood-level rent, and Bay Area utility realities.

![Light + dark mode](https://img.shields.io/badge/themes-light%20%2B%20dark-1a3a2e)
![Persistent](https://img.shields.io/badge/saves-localStorage-c45a3a)
![Deploy](https://img.shields.io/badge/deploy-Vercel-000)

## What it computes

- **Take-home pay** from base + bonus + RSUs, with 401(k), federal income tax (2026 brackets), California state tax, FICA (Social Security capped at the 2026 wage base, Medicare + 0.9% Additional Medicare), and CA SDI.
- **Housing** by specific Bay Area neighborhood (Sunnyvale, Mountain View, Palo Alto, Cupertino, Santa Clara, San Jose, Los Altos, Menlo Park, Redwood City, Fremont, San Francisco, Oakland) plus LA, OC, San Diego, and Sacramento. Rent and buy modes; bedroom + bathroom inputs. Custom rent override available.
- **Utilities** with Bay Area defaults (PG&E electric/gas, Valley Water, garbage, internet, mobile per adult, streaming) that scale with household size, bedrooms, and a usage multiplier (Efficient / Average / Heavy / Very heavy). Per-line overrides available.
- **Other expenses**: childcare per kid in daycare, groceries (per adult and per child, with regional cost multiplier), transportation, healthcare, and discretionary.

Outputs include monthly take-home, total expenses, leftover/savings rate, and bar-chart breakdowns of both the tax stack and the expense stack.

## Quick start

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

To build for production:

```bash
npm run build
npm run preview
```

## Deploying to Vercel

This is a vanilla Vite + React app and Vercel auto-detects it. Two options:

### Option 1 — GitHub + Vercel dashboard

1. Push the project to a new GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel detects Vite and uses `npm run build` + `dist` automatically. Click **Deploy**.

### Option 2 — Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. First deploy creates the project; subsequent `vercel --prod` deploys to production.

No environment variables, no API routes, no server. The app is a static SPA.

## Project layout

```
src/
├── App.jsx                  Main composition + theme toggle
├── main.jsx                 React entry
├── styles.css               CSS variables, both themes, all visual rules
├── data/
│   ├── tax.js               2026 federal & CA tax constants
│   ├── neighborhoods.js     Per-neighborhood rent, home price, childcare, grocery multiplier
│   └── utilities.js         Bay Area utility defaults + usage scaling
├── lib/
│   ├── calculations.js      Tax math, housing math, expense math, master `runCalculation`
│   ├── format.js            Currency / percent formatters
│   └── useLocalStorage.js   Persistence hook
└── components/
    ├── Inputs.jsx           Reusable input building blocks
    ├── CompCard.jsx
    ├── HouseholdCard.jsx
    ├── LocationCard.jsx
    ├── UtilitiesCard.jsx
    └── Results.jsx          Headline numbers + tax/expense breakdowns
```

## Customization

- **Add a neighborhood**: append a row to `src/data/neighborhoods.js`. Each row is `(id, city, name, rent2br, homePrice, childcare, groceryMult)`.
- **Adjust utility defaults**: edit base/perPerson/perBedroom in `src/data/utilities.js`.
- **Update tax brackets** when the IRS or FTB publishes new ones: edit `src/data/tax.js`.
- **Change the visual theme**: every color is a CSS variable in `src/styles.css`, both for light and dark modes.

## What this is not

Not tax advice. Not financial advice. Not appraisal-grade housing data. The numbers are calibrated to give relocation candidates a realistic relative picture across neighborhoods and family sizes. Real take-home depends on itemized deductions, HSA/FSA contributions, dependent-care credit, child tax credit, AMT exposure, RSU withholding shortfalls, employer benefits, and a dozen other factors. Verify with a CPA before making big decisions.

## License

MIT.
