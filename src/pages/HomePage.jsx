import StationMap from "../components/StationMap.jsx";
import { useStations } from "../context/StationsContext.jsx";

export default function HomePage() {
  const { stations, status, error, reload } = useStations();
  return (
    <section className="page">
      <h1>Карта АЗС</h1>
      {status === "loading" && <p>Загрузка…</p>}
      {status === "error" && (
        <p>
          {error} <button type="button" onClick={reload}>Повторить</button>
        </p>
      )}
      {status === "ready" && <StationMap stations={stations} />}
    </section>
  );
}
