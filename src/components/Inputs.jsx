// Reusable input building blocks shared across input cards.

export function DollarField({ label, value, onChange, step = 1000, min = 0 }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <div className="input-wrap">
        <span className="input-prefix">$</span>
        <input
          type="number"
          className="input with-prefix"
          value={value}
          step={step}
          min={min}
          onChange={(e) => onChange(Math.max(min, +e.target.value || 0))}
        />
      </div>
    </div>
  );
}

export function CounterField({ label, value, onChange, min = 0, max = 10 }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <div className="counter">
        <button
          type="button"
          className="counter-btn"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
        >−</button>
        <span className="counter-value">{value}</span>
        <button
          type="button"
          className="counter-btn"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
        >+</button>
      </div>
    </div>
  );
}

export function PillGroup({ options, value, onChange }) {
  return (
    <div className="pill-group">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`pill ${value === opt.value ? 'active' : ''}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function SliderField({ label, value, onChange, min, max, step = 1, suffix = '' }) {
  return (
    <div>
      <div className="field-label">
        <span>{label}</span>
        <span className="field-label-value">{value}{suffix}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
      />
    </div>
  );
}
