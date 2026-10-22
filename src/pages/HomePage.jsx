import { useMemo, useState } from 'react';
import FuelFilter from '../components/FuelFilter.jsx';
import StationCard from '../components/StationCard.jsx';
import StationMap from '../components/StationMap.jsx';
import StateMessage from '../components/StateMessage.jsx';
import { useStations } from '../context/StationsContext.jsx';
import { filterStationsByFuel } from '../utils/filterStations.js';

export default function HomePage() {
  const { stations, status, error, reload, getLatestMark } = useStations();
  const [fuelFilter, setFuelFilter] = useState('all');

  const filtered = useMemo(
    () => filterStationsByFuel(stations, fuelFilter, getLatestMark),
    [stations, fuelFilter, getLatestMark]
  );

  return (
    <section className="page home-page" aria-labelledby="intro-title">
      <div className="intro">
        <h1 id="intro-title">АЗС Свердловской области</h1>
        <p>
          Найдите заправку с нужной маркой топлива, посмотрите свежие отметки о наличии
          и сохраните станцию в избранное.
        </p>
      </div>

      <FuelFilter value={fuelFilter} onChange={setFuelFilter} />

      {status === 'loading' ? (
        <StateMessage
          variant="loading"
          title="Загрузка АЗС…"
          text="Запрашиваем OpenStreetMap / Overpass. Это может занять несколько секунд."
        />
      ) : null}

      {status === 'error' ? (
        <StateMessage
          variant="error"
          title="Не удалось загрузить АЗС"
          text={error || 'Проверьте сеть и повторите попытку.'}
          actionLabel="Повторить"
          onAction={reload}
        />
      ) : null}

      {status === 'ready' && filtered.length === 0 ? (
        <StateMessage
          variant="empty"
          title="АЗС не найдены"
          text={
            fuelFilter === 'all'
              ? 'По запросу Overpass станции не найдены.'
              : 'Нет станций с отметкой «есть» по выбранной марке. Снимите фильтр или оставьте отметки на карточках АЗС.'
          }
          actionLabel={fuelFilter !== 'all' ? 'Сбросить фильтр' : undefined}
          onAction={fuelFilter !== 'all' ? () => setFuelFilter('all') : undefined}
        />
      ) : null}

      {status === 'ready' && filtered.length > 0 ? (
        <div className="content-grid">
          <section className="map-section" aria-labelledby="map-title">
            <h2 id="map-title">Карта</h2>
            <StationMap stations={filtered} />
          </section>
          <section className="list-section" aria-labelledby="list-title">
            <h2 id="list-title">Список АЗС ({filtered.length})</h2>
            <ul className="station-list">
              {filtered.slice(0, 80).map((station) => (
                <li key={station.id}>
                  <StationCard station={station} fuelFilter={fuelFilter} />
                </li>
              ))}
            </ul>
            {filtered.length > 80 ? (
              <p className="muted">В списке показаны первые 80 станций. Уточните область на карте или фильтр.</p>
            ) : null}
          </section>
        </div>
      ) : null}
    </section>
  );
}
