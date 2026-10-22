/**
 * Filter stations by fuel mark availability.
 * "all" — show everyone.
 * Specific fuel — stations with latest mark for that fuel = available
 * (or OSM fuelTags hint as soft match when no marks yet — only available marks count for strict filter).
 */
export function filterStationsByFuel(stations, fuelFilter, getLatestMark) {
  if (!fuelFilter || fuelFilter === 'all') return stations;

  return stations.filter((station) => {
    const mark = getLatestMark(station.id, fuelFilter);
    return mark?.status === 'available';
  });
}
