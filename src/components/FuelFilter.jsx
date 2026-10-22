import { FUEL_LABELS, FUEL_TYPES } from '../models/types.js';

export default function FuelFilter({ value, onChange }) {
  return (
    <section className="filters" aria-labelledby="filters-title">
      <h2 id="filters-title">Фильтр по марке топлива</h2>
      <fieldset>
        <legend>Выберите марку</legend>
        <div className="chip-row" role="radiogroup" aria-label="Марка топлива">
          <label className="chip">
            <input
              type="radio"
              name="fuel"
              value="all"
              checked={value === 'all'}
              onChange={() => onChange('all')}
            />
            Все
          </label>
          {FUEL_TYPES.map((fuel) => (
            <label className="chip" key={fuel}>
              <input
                type="radio"
                name="fuel"
                value={fuel}
                checked={value === fuel}
                onChange={() => onChange(fuel)}
              />
              {FUEL_LABELS[fuel]}
            </label>
          ))}
        </div>
      </fieldset>
    </section>
  );
}
