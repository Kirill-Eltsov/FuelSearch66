import { useState } from "react";
import StationCard from "../components/StationCard.jsx";
import StationMap from "../components/StationMap.jsx";
import { useStations } from "../context/StationsContext.jsx";

export default function HomePage() {
  const { stations, status, error, reload } = useStations();
  return (
    <section className="page home-page">
      <div className="intro">
        <h1>АЗС Свердловской области</h1>
        <p>Карта и список заправок по данным OpenStreetMap.</p>
      </div>
      {status === "loading" && <p>Загрузка…</p>}
      {status === "error" && (
        <p>
          {error} <button type="button" onClick={reload}>Повторить</button>
        </p>
      )}
      {status === "ready" && (
        <div className="content-grid">
          <section>
            <h2>Карта</h2>
            <StationMap stations={stations} />
          </section>
          <section>
            <h2>Список АЗС ({stations.length})</h2>
            <ul className="station-list">
              {stations.slice(0, 80).map((station) => (
                <li key={station.id}>
                  <StationCard station={station} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </section>
  );
}
