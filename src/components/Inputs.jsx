// Reusable input building blocks shared across input cards.
import { useState, useEffect } from 'react';

export function DollarField({ label, value, onChange, step = 1000, min = 0 }) {
  // Local string state lets an empty field stay empty instead of snapping to 0
  const [text, setText] = useState(value === 0 ? '' : String(value));

  // Sync if the parent value changes externally (e.g. hydrated from storage)
  useEffect(() => {
    const current = text === '' ? 0 : Number(text);
    if (current !== value) setText(value === 0 ? '' : String(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div>
      <label className="field-label">{label}</label>
      <div className="input-wrap">
        <span className="input-prefix">$</span>
        <input
          type="number"
          className="input with-prefix"
          value={text}
          step={step}
          min={min}
          placeholder="0"
          onChange={(e) => {
            const v = e.target.value;
            setText(v);
            onChange(v === '' ? min : Math.max(min, Number(v) || 0));
          }}
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
