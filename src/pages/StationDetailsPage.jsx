import { Link, useParams } from "react-router-dom";
import StatusBadge from "../components/StatusBadge.jsx";
import { useStations } from "../context/StationsContext.jsx";

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString("ru-RU", { dateStyle: "short", timeStyle: "short" });
  } catch {
    return iso;
  }
}

export default function StationDetailsPage() {
  const { id } = useParams();
  const { stations, status, getMarks, isFavorite, toggleFavorite } = useStations();
  const station = stations.find((s) => s.id === String(id));
  const marks = station ? getMarks(station.id) : [];
  const favorite = station ? isFavorite(station.id) : false;

  if (status === "loading") return <p>Загрузка…</p>;
  if (!station) {
    return (
      <section className="page">
        <p>Станция не найдена</p>
        <Link to="/">К карте</Link>
      </section>
    );
  }

  return (
    <section className="page details-page">
      <p><Link to="/">← К карте</Link></p>
      <div className="details-block">
        <h1>{station.name}</h1>
        <p>{station.address}</p>
        <p className="muted">
          Координаты: {station.lat.toFixed(5)}, {station.lon.toFixed(5)}
        </p>
        <p className="form-actions">
          <button type="button" className="btn btn-primary" onClick={() => toggleFavorite(station.id)}>
            {favorite ? "Убрать из избранного" : "В избранное"}
          </button>
        </p>
        <h2>Отметки</h2>
        {marks.length === 0 ? (
          <p className="muted">Пока нет локальных отметок.</p>
        ) : (
          <ul className="marks-list">
            {marks.map((mark) => (
              <li key={mark.createdAt + mark.fuelType}>
                <StatusBadge status={mark.status} fuelType={mark.fuelType} />
                <span className="muted"> · {formatDate(mark.createdAt)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
