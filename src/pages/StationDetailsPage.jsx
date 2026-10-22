import { Link, useParams } from 'react-router-dom';
import MarkForm from '../components/MarkForm.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import StateMessage from '../components/StateMessage.jsx';
import { useStations } from '../context/StationsContext.jsx';
import { FUEL_LABELS, STATUS_LABELS } from '../models/types.js';

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString('ru-RU', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  } catch {
    return iso;
  }
}

export default function StationDetailsPage() {
  const { id } = useParams();
  const {
    stations,
    status,
    getMarks,
    addMark,
    isFavorite,
    toggleFavorite,
  } = useStations();

  const station = stations.find((s) => s.id === String(id));
  const marks = station ? getMarks(station.id) : [];
  const favorite = station ? isFavorite(station.id) : false;

  if (status === 'loading') {
    return (
      <StateMessage
        variant="loading"
        title="Загрузка…"
        text="Подтягиваем данные станций."
      />
    );
  }

  if (!station) {
    return (
      <section className="page">
        <StateMessage
          variant="empty"
          title="Станция не найдена"
          text="Возможно, данные ещё не загрузились или идентификатор устарел."
        />
        <p>
          <Link to="/">Вернуться на карту</Link>
        </p>
      </section>
    );
  }

  return (
    <section className="page details-page" aria-labelledby="details-title">
      <p>
        <Link to="/">← К карте</Link>
      </p>
      <div className="details-block">
        <h1 id="details-title">{station.name}</h1>
        <p>{station.address}</p>
        <p className="muted">
          Координаты: {station.lat.toFixed(5)}, {station.lon.toFixed(5)} ·{' '}
          <a
            href={`https://www.openstreetmap.org/?mlat=${station.lat}&mlon=${station.lon}#map=17/${station.lat}/${station.lon}`}
            target="_blank"
            rel="noreferrer"
          >
            Открыть в OSM
          </a>
        </p>

        <p className="form-actions">
          <button
            type="button"
            className={`btn ${favorite ? 'btn-secondary' : 'btn-primary'}`}
            onClick={() => toggleFavorite(station.id)}
            aria-pressed={favorite}
          >
            {favorite ? 'Убрать из избранного' : 'В избранное'}
          </button>
        </p>

        <h2>Отметки</h2>
        {marks.length === 0 ? (
          <p className="muted">Пока нет локальных отметок о наличии топлива.</p>
        ) : (
          <ul className="marks-list">
            {marks.map((mark) => (
              <li key={`${mark.createdAt}-${mark.fuelType}-${mark.status}`}>
                <StatusBadge status={mark.status} fuelType={mark.fuelType} />
                <span className="muted"> · {formatDate(mark.createdAt)}</span>
                <span className="sr-only">
                  {STATUS_LABELS[mark.status]} {FUEL_LABELS[mark.fuelType]}
                </span>
              </li>
            ))}
          </ul>
        )}

        <MarkForm
          onSubmit={({ fuelType, status: markStatus }) => {
            addMark({
              stationId: station.id,
              fuelType,
              status: markStatus,
            });
          }}
        />
      </div>
    </section>
  );
}
