import { useEffect, useMemo, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const CENTER = [56.8389, 60.6057];
const MAX_MARKERS = 250;

function BoundsWatcher({ onBounds }) {
  const map = useMap();
  useMapEvents({
    moveend: () => onBounds(map.getBounds()),
    zoomend: () => onBounds(map.getBounds()),
  });
  useEffect(() => {
    onBounds(map.getBounds());
  }, [map, onBounds]);
  return null;
}

export default function StationMap({ stations }) {
  const [bounds, setBounds] = useState(null);

  const visible = useMemo(() => {
    let list = stations;
    if (bounds) {
      list = stations.filter((s) => bounds.contains([s.lat, s.lon]));
    }
    if (list.length > MAX_MARKERS) {
      return list.slice(0, MAX_MARKERS);
    }
    return list;
  }, [stations, bounds]);

  return (
    <div className="map-panel" aria-label="Карта АЗС Свердловской области">
      <MapContainer
        center={CENTER}
        zoom={10}
        minZoom={7}
        maxZoom={18}
        scrollWheelZoom
        className="leaflet-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <BoundsWatcher onBounds={setBounds} />
        {visible.map((station) => (
          <Marker key={station.id} position={[station.lat, station.lon]}>
            <Popup>
              <strong>{station.name}</strong>
              <br />
              {station.address}
              <br />
              <Link to={`/station/${station.id}`}>Открыть карточку</Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <p className="map-hint muted">
        Показано маркеров в области карты: {visible.length}
        {stations.length !== visible.length ? ` из ${stations.length}` : ''}
      </p>
    </div>
  );
}
