import { CounterField, DollarField } from './Inputs.jsx';

export default function HouseholdCard({ state, set, calc }) {
  const total = state.adults + state.children;
  const defaultDaycare = calc.neighborhood.childcare;

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title display">Household</h2>
        <span className="card-meta">{total} {total === 1 ? 'person' : 'people'}</span>
      </div>
      <div className="card-body">
        <CounterField
          label="Adults"
          value={state.adults}
          onChange={(v) => set({ adults: v })}
          min={1}
          max={4}
        />
        <CounterField
          label="Children"
          value={state.children}
          onChange={(v) => {
            const update = { children: v };
            if (state.childrenInDaycare > v) update.childrenInDaycare = v;
            set(update);
          }}
          min={0}
          max={6}
        />
        {state.children > 0 && (
          <CounterField
            label="Children in daycare"
            value={state.childrenInDaycare}
            onChange={(v) => set({ childrenInDaycare: v })}
            min={0}
            max={state.children}
          />
        )}
        {state.childrenInDaycare > 0 && (
          <div>
            <label className="field-label">Daycare per child / month</label>
            <div className="input-wrap">
              <span className="input-prefix">$</span>
              <input
                type="number"
                className="input with-prefix"
                value={state.daycareCostPerChild ?? ''}
                placeholder={String(defaultDaycare)}
                step={50}
                min={0}
                onChange={(e) => set({ daycareCostPerChild: e.target.value === '' ? null : +e.target.value })}
              />
            </div>
            <div className="hint">Leave blank to use the {calc.neighborhood.city} estimate (${defaultDaycare}/mo).</div>
          </div>
        )}
        <DollarField
          label="Health insurance premium / month"
          value={state.healthPremium}
          onChange={(v) => set({ healthPremium: v })}
          step={25}
        />
        <DollarField
          label="Groceries per adult / month"
          value={state.groceriesPerAdult}
          onChange={(v) => set({ groceriesPerAdult: v })}
          step={25}
        />
        <DollarField
          label="Groceries per child / month"
          value={state.groceriesPerChild}
          onChange={(v) => set({ groceriesPerChild: v })}
          step={25}
        />
      </div>
    </div>
  );
}
