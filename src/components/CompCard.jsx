import { DollarField, PillGroup, SliderField } from './Inputs.jsx';
import { fmt } from '../lib/format.js';
import { RETIREMENT_401K_LIMIT } from '../data/tax.js';

export default function CompCard({ state, set, calc }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title display">Compensation</h2>
        <span className="card-meta">Annual</span>
      </div>
      <div className="card-body">
        <DollarField
          label="Base salary"
          value={state.baseSalary}
          onChange={(v) => set({ baseSalary: v })}
        />
        <DollarField
          label="Annual bonus (target)"
          value={state.bonus}
          onChange={(v) => set({ bonus: v })}
        />
        <DollarField
          label="RSU vesting per year"
          value={state.rsuAnnual}
          onChange={(v) => set({ rsuAnnual: v })}
        />

        <SliderField
          label="401(k) contribution"
          value={state.retirement401kPct}
          onChange={(v) => set({ retirement401kPct: v })}
          min={0}
          max={50}
          suffix="%"
        />
        <div className="hint">
          {fmt(calc.ret401k)} this year{' '}
          {calc.ret401k >= RETIREMENT_401K_LIMIT && '(IRS 2026 cap reached)'}
        </div>

        <div>
          <label className="field-label">Filing status</label>
          <PillGroup
            value={state.filingStatus}
            onChange={(v) => set({ filingStatus: v })}
            options={[
              { value: 'single', label: 'Single' },
              { value: 'mfj', label: 'Married, jointly' },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
