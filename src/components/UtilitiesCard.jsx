import { useState } from 'react';
import { fmt } from '../lib/format.js';
import { USAGE_PRESETS } from '../data/utilities.js';
import { PillGroup } from './Inputs.jsx';

export default function UtilitiesCard({ state, set, calc }) {
  const [showDetails, setShowDetails] = useState(false);

  const updateOverride = (id, value) => {
    set({
      utilityOverrides: {
        ...state.utilityOverrides,
        [id]: value === '' ? null : Number(value),
      },
    });
  };

  const resetAll = () => set({ utilityOverrides: {} });

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title display">Utilities</h2>
        <span className="card-meta">{fmt(calc.utilities.total)} / mo</span>
      </div>

      <div className="card-body">
        <div>
          <label className="field-label">Household usage</label>
          <PillGroup
            value={USAGE_PRESETS.find((p) => Math.abs(p.multiplier - state.usageMultiplier) < 0.01)?.id || 'average'}
            onChange={(id) => {
              const preset = USAGE_PRESETS.find((p) => p.id === id);
              if (preset) set({ usageMultiplier: preset.multiplier });
            }}
            options={USAGE_PRESETS.map((p) => ({ value: p.id, label: p.label }))}
          />
          <div className="hint">
            Scales electric, gas, and water. {USAGE_PRESETS.find((p) =>
              Math.abs(p.multiplier - state.usageMultiplier) < 0.01
            )?.description || `${Math.round(state.usageMultiplier * 100)}% of baseline`}
          </div>
        </div>

        <div>
          {calc.utilities.items.map((item) => (
            <div key={item.id} className="util-row">
              <span className="util-label">{item.label}</span>
              {showDetails ? (
                <input
                  type="number"
                  className="util-input"
                  value={state.utilityOverrides[item.id] ?? item.amount}
                  onChange={(e) => updateOverride(item.id, e.target.value)}
                  step={5}
                  min={0}
                />
              ) : (
                <span className="util-value">{fmt(item.amount)}</span>
              )}
            </div>
          ))}
          <div className="util-summary">
            <span>Total monthly utilities</span>
            <span className="tabular">{fmt(calc.utilities.total)}</span>
          </div>
          <button type="button" className="util-toggle" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? 'Hide line-item editing' : 'Edit individual lines'}
          </button>
          {showDetails && Object.values(state.utilityOverrides).some((v) => v !== null && v !== undefined) && (
            <button
              type="button"
              className="util-toggle"
              onClick={resetAll}
              style={{ marginLeft: 14 }}
            >
              Reset all to defaults
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
