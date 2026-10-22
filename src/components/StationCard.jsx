import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge.jsx';
import { useStations } from '../context/StationsContext.jsx';

export default function StationCard({ station, fuelFilter = 'all' }) {
  const { getLatestMark, getMarks } = useStations();
  const latestForFilter =
    fuelFilter !== 'all' ? getLatestMark(station.id, fuelFilter) : null;
  const anyLatest = getMarks(station.id)[0] || null;
  const mark = latestForFilter || (fuelFilter === 'all' ? anyLatest : null);

  return (
    <article className="station-card">
      <h3>{station.name}</h3>
      <p>{station.address}</p>
      {mark ? (
        <p>
          <StatusBadge status={mark.status} fuelType={mark.fuelType} />
        </p>
      ) : (
        <p className="muted">Отметок пока нет</p>
      )}
      <p>
        <Link className="station-card__link" to={`/station/${station.id}`}>
          Открыть карточку
        </Link>
      </p>
    </article>
  );
}
