import { CounterField, PillGroup } from './Inputs.jsx';
import { CAR_TYPES, OWNERSHIPS, getCarType, computeVehicleCost } from '../data/vehicles.js';
import { fmt } from '../lib/format.js';

const DEFAULT_VEHICLE = { type: 'midsize', ownership: 'finance' };

export default function VehiclesCard({ state, set }) {
  const vehicles = state.vehicles || [];
  const totalCost = vehicles.reduce((s, v) => s + computeVehicleCost(v).total, 0);

  const setCount = (n) => {
    const next = [...vehicles];
    while (next.length < n) next.push({ ...DEFAULT_VEHICLE });
    while (next.length > n) next.pop();
    set({ vehicles: next });
  };

  const updateVehicle = (idx, patch) => {
    const next = vehicles.map((v, i) => (i === idx ? { ...v, ...patch } : v));
    set({ vehicles: next });
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title display">Vehicles</h2>
        <span className="card-meta">{fmt(totalCost)} / mo</span>
      </div>
      <div className="card-body">
        <CounterField
          label="Number of vehicles"
          value={vehicles.length}
          onChange={setCount}
          min={0}
          max={4}
        />

        {vehicles.map((v, idx) => {
          const t = getCarType(v.type);
          const c = computeVehicleCost(v);
          return (
            <div key={idx} className="vehicle-block">
              <div className="vehicle-block-title">Vehicle {idx + 1}</div>
              <div className="vehicle-field">
                <label className="field-label">Type</label>
                <PillGroup
                  value={v.type}
                  onChange={(val) => updateVehicle(idx, { type: val })}
                  options={CAR_TYPES.map((ct) => ({ value: ct.id, label: ct.label }))}
                />
                <div className="hint">{t.examples}</div>
              </div>
              <div className="vehicle-field">
                <label className="field-label">Method</label>
                <PillGroup
                  value={v.ownership}
                  onChange={(val) => updateVehicle(idx, { ownership: val })}
                  options={OWNERSHIPS.map((o) => ({ value: o.id, label: o.label }))}
                />
              </div>
              <div className="vehicle-summary">
                <div className="vehicle-summary-row">
                  <span>Payment</span>
                  <span className="tabular">{c.payment > 0 ? fmt(c.payment) : '—'}</span>
                </div>
                <div className="vehicle-summary-row">
                  <span>Insurance</span>
                  <span className="tabular">{fmt(c.insurance)}</span>
                </div>
                <div className="vehicle-summary-row">
                  <span>Fuel / charging</span>
                  <span className="tabular">{fmt(c.fuel)}</span>
                </div>
                <div className="vehicle-summary-row total">
                  <span>Vehicle total</span>
                  <span className="tabular">{fmt(c.total)} / mo</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
