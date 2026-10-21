const OVERPASS_URLS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
];

/** Sverdlovsk Oblast approximate bbox: south,west,north,east */
const SVERDLOVSK_BBOX = '56.0,57.0,61.9,66.2';

const QUERY = `
[out:json][timeout:90];
(
  node["amenity"="fuel"](${SVERDLOVSK_BBOX});
  way["amenity"="fuel"](${SVERDLOVSK_BBOX});
);
out center tags;
`.trim();

function buildAddress(tags = {}) {
  const parts = [
    tags['addr:street'] && tags['addr:housenumber']
      ? `${tags['addr:street']}, ${tags['addr:housenumber']}`
      : tags['addr:street'] || tags['addr:housenumber'],
    tags['addr:city'] || tags['addr:town'] || tags['addr:suburb'] || tags['addr:place'],
  ].filter(Boolean);
  return parts.join(', ') || 'Адрес не указан в OSM';
}

function buildName(tags = {}) {
  return (
    tags.name ||
    tags.brand ||
    tags.operator ||
    tags['name:ru'] ||
    'АЗС без названия'
  );
}

function extractFuelTags(tags = {}) {
  const raw = [
    tags.fuel,
    tags['fuel:diesel'],
    tags['fuel:octane_92'],
    tags['fuel:octane_95'],
    tags['fuel:octane_98'],
    tags['fuel:octane_100'],
  ]
    .filter(Boolean)
    .join(' ');
  return raw ? [raw] : [];
}

function mapElement(el) {
  const lat = el.lat ?? el.center?.lat;
  const lon = el.lon ?? el.center?.lon;
  if (typeof lat !== 'number' || typeof lon !== 'number') return null;

  return {
    id: String(el.id),
    name: buildName(el.tags),
    address: buildAddress(el.tags),
    lat,
    lon,
    fuelTags: extractFuelTags(el.tags),
  };
}

/**
 * Fetch AZS stations in Sverdlovsk Oblast via Overpass API.
 * @returns {Promise<import('../models/types.js').Station[]>}
 */
export async function fetchStations() {
  let lastError = null;

  for (const url of OVERPASS_URLS) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: `data=${encodeURIComponent(QUERY)}`,
      });

      if (!response.ok) {
        lastError = new Error(`Overpass HTTP ${response.status}`);
        continue;
      }

      const data = await response.json();
      const stations = (data.elements || [])
        .map(mapElement)
        .filter(Boolean);

      const unique = new Map();
      for (const station of stations) {
        unique.set(station.id, station);
      }
      return Array.from(unique.values());
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
    }
  }

  throw lastError || new Error('Не удалось загрузить данные Overpass');
}
