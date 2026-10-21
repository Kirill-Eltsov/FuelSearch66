const PREFIX = 'FuelSearch66';
const MARKS_KEY = `${PREFIX}:marks`;
const FAVORITES_KEY = `${PREFIX}:favorites`;

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/** @returns {import('../models/types.js').Mark[]} */
export function getAllMarks() {
  return readJson(MARKS_KEY, []);
}

/** @param {string} stationId */
export function getMarks(stationId) {
  return getAllMarks()
    .filter((m) => m.stationId === stationId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

/**
 * @param {{ stationId: string, fuelType: string, status: string }} payload
 */
export function addMark(payload) {
  const marks = getAllMarks();
  const mark = {
    stationId: String(payload.stationId),
    fuelType: payload.fuelType,
    status: payload.status,
    createdAt: new Date().toISOString(),
  };
  marks.push(mark);
  writeJson(MARKS_KEY, marks);
  return mark;
}

/** @returns {import('../models/types.js').Favorite[]} */
export function getFavorites() {
  return readJson(FAVORITES_KEY, []);
}

export function isFavorite(stationId) {
  return getFavorites().some((f) => f.stationId === String(stationId));
}

export function toggleFavorite(stationId) {
  const id = String(stationId);
  const favorites = getFavorites();
  const index = favorites.findIndex((f) => f.stationId === id);
  if (index >= 0) {
    favorites.splice(index, 1);
    writeJson(FAVORITES_KEY, favorites);
    return false;
  }
  favorites.push({ stationId: id, addedAt: new Date().toISOString() });
  writeJson(FAVORITES_KEY, favorites);
  return true;
}

/**
 * Latest mark for station + fuel, or null.
 * @param {string} stationId
 * @param {string} fuelType
 */
export function getLatestMark(stationId, fuelType) {
  return (
    getMarks(stationId).find((m) => m.fuelType === fuelType) || null
  );
}
