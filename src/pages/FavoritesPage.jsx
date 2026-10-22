import { Link, useNavigate } from 'react-router-dom';
import StationCard from '../components/StationCard.jsx';
import StateMessage from '../components/StateMessage.jsx';
import { useStations } from '../context/StationsContext.jsx';

export default function FavoritesPage() {
  const navigate = useNavigate();
  const { stations, favorites, status } = useStations();

  const favoriteStations = favorites
    .map((fav) => stations.find((s) => s.id === fav.stationId))
    .filter(Boolean);

  return (
    <section className="page favorites-page" aria-labelledby="fav-title">
      <h1 id="fav-title">Избранное</h1>
      <p className="muted">
        Станции хранятся локально в браузере (localStorage) и не синхронизируются между
        устройствами.
      </p>

      {status === 'loading' ? (
        <StateMessage variant="loading" title="Загрузка…" text="Получаем список АЗС." />
      ) : null}

      {status !== 'loading' && favoriteStations.length === 0 ? (
        <StateMessage
          variant="empty"
          title="Избранных АЗС пока нет"
          text="Откройте карточку станции и нажмите «В избранное»."
          actionLabel="К карте"
          onAction={() => navigate('/')}
        />
      ) : null}

      {favoriteStations.length > 0 ? (
        <ul className="station-list">
          {favoriteStations.map((station) => (
            <li key={station.id}>
              <StationCard station={station} />
            </li>
          ))}
        </ul>
      ) : null}

      <p>
        <Link to="/">← К карте</Link>
      </p>
    </section>
  );
}
