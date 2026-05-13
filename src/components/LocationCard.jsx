import { useMemo } from 'react';
import { PillGroup, DollarField, SliderField, CounterField } from './Inputs.jsx';
import { NEIGHBORHOODS, groupByCity } from '../data/neighborhoods.js';
import { fmtK } from '../lib/format.js';

export default function LocationCard({ state, set, calc }) {
  const cities = useMemo(() => groupByCity(NEIGHBORHOODS), []);
  const n = calc.neighborhood;

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title display">Location</h2>
        <span className="card-meta">{n.name}</span>
      </div>
      <div className="card-body">
        <div>
          <label className="field-label">Neighborhood</label>
          <select
            className="select"
            value={state.neighborhoodId}
            onChange={(e) => set({ neighborhoodId: e.target.value })}
          >
            {cities.map(([city, list]) => (
              <optgroup label={city} key={city}>
                {list.map((nb) => (
                  <option key={nb.id} value={nb.id}>
                    {nb.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <div className="hint">
            Median 2BR rent here: {fmtK(n.rent2br)} · 3BR home: {fmtK(n.homePrice)}
          </div>
        </div>

        <div>
          <label className="field-label">Housing</label>
          <PillGroup
            value={state.housingType}
            onChange={(v) => set({ housingType: v })}
            options={[
              { value: 'rent', label: 'Rent' },
              { value: 'buy', label: 'Buy' },
            ]}
          />
        </div>

        <CounterField
          label="Bedrooms"
          value={state.bedrooms}
          onChange={(v) => set({ bedrooms: v })}
          min={1}
          max={4}
        />

        <div>
          <div className="field-label">
            <span>Bathrooms</span>
            <span className="field-label-value">{state.bathrooms.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min={1}
            max={4}
            step={0.5}
            value={state.bathrooms}
            onChange={(e) => set({ bathrooms: +e.target.value })}
          />
        </div>

        {state.housingType === 'rent' && (
          <div>
            <label className="field-label">
              <span>Custom rent override (optional)</span>
            </label>
            <div className="input-wrap">
              <span className="input-prefix">$</span>
              <input
                type="number"
                className="input with-prefix"
                value={state.customRent || ''}
                placeholder="Use estimate"
                step={50}
                min={0}
                onChange={(e) => set({ customRent: e.target.value === '' ? null : +e.target.value })}
              />
            </div>
            <div className="hint">Leave blank to use the neighborhood estimate.</div>
          </div>
        )}

        {state.housingType === 'buy' && (
          <>
            <SliderField
              label="Down payment"
              value={state.downPct}
              onChange={(v) => set({ downPct: v })}
              min={3}
              max={50}
              suffix="%"
            />
            <SliderField
              label="Mortgage rate"
              value={state.mortgageRate}
              onChange={(v) => set({ mortgageRate: v })}
              min={3}
              max={10}
              step={0.125}
              suffix="%"
            />
          </>
        )}

        <DollarField
          label="Transportation per adult / month"
          value={state.transportPerAdult}
          onChange={(v) => set({ transportPerAdult: v })}
          step={25}
        />
        <DollarField
          label="Discretionary per person / month"
          value={state.miscPerPerson}
          onChange={(v) => set({ miscPerPerson: v })}
          step={25}
        />
      </div>
    </div>
  );
}
