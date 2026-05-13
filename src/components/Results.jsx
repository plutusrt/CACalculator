import { fmt, pct } from '../lib/format.js';

export default function Results({ calc, neighborhood }) {
  const housing = calc.housing.monthly;
  const housingShare = calc.takeHomeMonthly > 0 ? housing / calc.takeHomeMonthly : 0;

  const expenseBreakdown = [
    { label: 'Housing', value: housing, color: 'var(--color-1)' },
    { label: 'Childcare', value: calc.childcare, color: 'var(--color-2)' },
    { label: 'Utilities', value: calc.utilities.total, color: 'var(--color-5)' },
    { label: 'Groceries', value: calc.groceries, color: 'var(--color-3)' },
    { label: 'Transportation', value: calc.transportation, color: 'var(--color-4)' },
    { label: 'Healthcare', value: calc.health, color: 'var(--color-6)' },
    { label: 'Discretionary', value: calc.misc, color: 'var(--color-7)' },
  ]
    .filter((e) => e.value > 0)
    .sort((a, b) => b.value - a.value);

  const maxExp = Math.max(...expenseBreakdown.map((e) => e.value));

  const taxBreakdown = [
    { label: 'Federal income tax', value: calc.fedTax / 12, color: 'var(--color-1)' },
    { label: 'California state tax', value: calc.caTax / 12, color: 'var(--color-3)' },
    { label: 'Social Security', value: calc.ss / 12, color: 'var(--color-5)' },
    { label: 'Medicare', value: (calc.medicare + calc.addlMedicare) / 12, color: 'var(--color-7)' },
    { label: 'CA SDI', value: calc.sdi / 12, color: 'var(--color-4)' },
    { label: '401(k) (still yours)', value: calc.ret401k / 12, color: 'var(--color-2)' },
  ];

  const monthlyComp = calc.totalComp / 12;

  return (
    <>
      {/* Headline band */}
      <div className="headline-band">
        <div className="container">
          <div className="headline-grid">
            <Headline
              label="Total comp"
              big={fmt(calc.totalComp)}
              sub={`${fmt(monthlyComp)} / month gross`}
            />
            <Headline
              label="Take-home"
              big={`${fmt(calc.takeHomeMonthly)}/mo`}
              sub={`${fmt(calc.takeHomeAnnual)} annually`}
            />
            <Headline
              label="Total expenses"
              big={`${fmt(calc.totalExpenses)}/mo`}
              sub={`${pct(calc.totalExpenses / calc.takeHomeMonthly)} of take-home`}
            />
            <Headline
              label={calc.leftOver >= 0 ? 'Left over' : 'Shortfall'}
              big={`${fmt(Math.abs(calc.leftOver))}/mo`}
              sub={
                calc.leftOver >= 0
                  ? `${pct(calc.savingsRate)} savings rate`
                  : 'Expenses exceed take-home'
              }
              warning={calc.leftOver < 0}
            />
          </div>
        </div>
      </div>

      {/* Breakdowns */}
      <div className="container" style={{ paddingTop: 40, paddingBottom: 32 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: 24,
          }}
        >
          {/* Tax breakdown */}
          <div className="card">
            <h3 className="card-title display" style={{ marginBottom: 4 }}>
              Where your comp <em>actually</em> goes
            </h3>
            <p className="hint" style={{ marginBottom: 18 }}>
              Effective tax rate: <strong>{pct(calc.effectiveTaxRate)}</strong>
            </p>
            {taxBreakdown.map((row) => (
              <BreakdownRow key={row.label} {...row} total={monthlyComp} />
            ))}
            <div className="breakdown-total">
              <span className="breakdown-total-label">Take-home</span>
              <span className="breakdown-total-value">{fmt(calc.takeHomeMonthly)}/mo</span>
            </div>
          </div>

          {/* Expense breakdown */}
          <div className="card">
            <h3 className="card-title display" style={{ marginBottom: 4 }}>
              Monthly expenses <em>in {neighborhood.name}</em>
            </h3>
            <p className={`hint ${housingShare > 0.30 ? 'hint-warn' : ''}`} style={{ marginBottom: 18 }}>
              Housing: <strong>{pct(housingShare)}</strong> of take-home
              {housingShare > 0.30 && ' · above the 30% rule'}
            </p>
            {expenseBreakdown.map((row) => (
              <BreakdownRow key={row.label} {...row} total={maxExp} useBarMax />
            ))}
            <div className="breakdown-total">
              <span className="breakdown-total-label">Total expenses</span>
              <span className="breakdown-total-value">{fmt(calc.totalExpenses)}/mo</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Headline({ label, big, sub, warning }) {
  return (
    <div>
      <div className="headline-label">{label}</div>
      <div className={`headline-big ${warning ? 'headline-warning' : ''}`}>{big}</div>
      <div className={`headline-sub ${warning ? 'headline-warning' : ''}`}>{sub}</div>
    </div>
  );
}

function BreakdownRow({ label, value, total, color, useBarMax }) {
  const widthPct = useBarMax
    ? (total > 0 ? (value / total) * 100 : 0)
    : (total > 0 ? (value / total) * 100 : 0);
  const sharePct = total > 0 && !useBarMax ? ((value / total) * 100).toFixed(1) : null;

  return (
    <div className="breakdown-row">
      <div className="breakdown-head">
        <span className="breakdown-label">{label}</span>
        <span className="breakdown-amount">
          {fmt(value)}
          {sharePct !== null && <span className="breakdown-amount-sub">· {sharePct}%</span>}
        </span>
      </div>
      <div className="breakdown-track">
        <div
          className="breakdown-fill"
          style={{ width: `${Math.min(100, widthPct)}%`, background: color }}
        />
      </div>
    </div>
  );
}
