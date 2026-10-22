import { FUEL_LABELS, STATUS_LABELS } from '../models/types.js';

export default function StatusBadge({ status, fuelType }) {
  if (!status) return null;
  const label = STATUS_LABELS[status] || status;
  const fuel = fuelType ? FUEL_LABELS[fuelType] || fuelType : null;
  return (
    <span className={`status status--${status}`}>
      {fuel ? `${label} · ${fuel}` : label}
    </span>
  );
}
