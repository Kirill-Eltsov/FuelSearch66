export default function AboutPage() {
  return (
    <section className="page about-page" aria-labelledby="about-title">
      <div className="about-block">
        <h1 id="about-title">О проекте</h1>
        <p>
          <strong>FuelSearch66</strong> — учебное клиентское веб-приложение для поиска АЗС
          в Свердловской области. Базовые точки заправок загружаются из OpenStreetMap через
          Overpass API. Отметки о наличии топлива и избранное хранятся только в вашем
          браузере (localStorage) и не отправляются на сервер.
        </p>
        <p>
          Стек: React + Vite, Leaflet / OSM, Overpass API. Авторизация и серверная
          синхронизация в MVP не предусмотрены.
        </p>
      </div>
    </section>
  );
}
