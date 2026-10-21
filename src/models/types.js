/** @typedef {'92' | '95' | '100' | 'DT'} FuelType */
/** @typedef {'available' | 'none' | 'low' | 'queue'} MarkStatus */

/**
 * @typedef {Object} Station
 * @property {string} id
 * @property {string} name
 * @property {string} address
 * @property {number} lat
 * @property {number} lon
 * @property {string[]} fuelTags
 */

/**
 * @typedef {Object} Mark
 * @property {string} stationId
 * @property {FuelType} fuelType
 * @property {MarkStatus} status
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Favorite
 * @property {string} stationId
 * @property {string} addedAt
 */

export const FUEL_TYPES = /** @type {const} */ (['92', '95', '100', 'DT']);

export const FUEL_LABELS = {
  '92': 'АИ-92',
  '95': 'АИ-95',
  '100': 'АИ-100',
  DT: 'ДТ',
};

export const MARK_STATUSES = /** @type {const} */ ([
  'available',
  'none',
  'low',
  'queue',
]);

export const STATUS_LABELS = {
  available: 'есть',
  none: 'нет',
  low: 'мало',
  queue: 'очередь',
};
