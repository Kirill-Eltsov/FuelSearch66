import { useState } from 'react';
import { FUEL_LABELS, FUEL_TYPES, MARK_STATUSES, STATUS_LABELS } from '../models/types.js';

export default function MarkForm({ onSubmit }) {
  const [fuelType, setFuelType] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSaved(false);
    if (!fuelType || !status) {
      setError('Выберите марку топлива и статус');
      return;
    }
    setError('');
    onSubmit({ fuelType, status });
    setSaved(true);
  }

  return (
    <form className="mark-form" onSubmit={handleSubmit} noValidate>
      <fieldset>
        <legend>Добавить отметку</legend>
        <p className="form-field">
          <label htmlFor="fuel-type">Марка топлива</label>
          <select
            id="fuel-type"
            name="fuel-type"
            required
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
          >
            <option value="">Выберите</option>
            {FUEL_TYPES.map((fuel) => (
              <option key={fuel} value={fuel}>
                {FUEL_LABELS[fuel]}
              </option>
            ))}
          </select>
        </p>
        <p className="form-field">
          <label htmlFor="mark-status">Статус</label>
          <select
            id="mark-status"
            name="mark-status"
            required
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Выберите</option>
            {MARK_STATUSES.map((item) => (
              <option key={item} value={item}>
                {STATUS_LABELS[item]}
              </option>
            ))}
          </select>
        </p>
        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}
        {saved ? (
          <p className="form-success" role="status">
            Отметка сохранена локально
          </p>
        ) : null}
        <p className="form-actions">
          <button className="btn btn-primary" type="submit">
            Сохранить отметку
          </button>
        </p>
      </fieldset>
    </form>
  );
}
