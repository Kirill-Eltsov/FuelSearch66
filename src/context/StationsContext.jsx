import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { fetchStations } from '../services/overpass.js';
import {
  addMark as storageAddMark,
  getAllMarks,
  getFavorites,
  getLatestMark,
  getMarks,
  isFavorite,
  toggleFavorite as storageToggleFavorite,
} from '../services/storage.js';

const StationsContext = createContext(null);

export function StationsProvider({ children }) {
  const [stations, setStations] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | loading | ready | error
  const [error, setError] = useState('');
  const [marksVersion, setMarksVersion] = useState(0);
  const [favoritesVersion, setFavoritesVersion] = useState(0);

  const loadStations = useCallback(async () => {
    setStatus('loading');
    setError('');
    try {
      const data = await fetchStations();
      setStations(data);
      setStatus('ready');
    } catch (err) {
      setStations([]);
      setStatus('error');
      setError(err?.message || 'Ошибка загрузки АЗС');
    }
  }, []);

  useEffect(() => {
    loadStations();
  }, [loadStations]);

  const marks = useMemo(() => {
    void marksVersion;
    return getAllMarks();
  }, [marksVersion]);

  const favorites = useMemo(() => {
    void favoritesVersion;
    return getFavorites();
  }, [favoritesVersion]);

  const addMark = useCallback((payload) => {
    const mark = storageAddMark(payload);
    setMarksVersion((v) => v + 1);
    return mark;
  }, []);

  const toggleFavorite = useCallback((stationId) => {
    const next = storageToggleFavorite(stationId);
    setFavoritesVersion((v) => v + 1);
    return next;
  }, []);

  const value = useMemo(
    () => ({
      stations,
      status,
      error,
      reload: loadStations,
      marks,
      favorites,
      addMark,
      toggleFavorite,
      isFavorite: (id) => {
        void favoritesVersion;
        return isFavorite(id);
      },
      getMarks: (id) => {
        void marksVersion;
        return getMarks(id);
      },
      getLatestMark: (id, fuel) => {
        void marksVersion;
        return getLatestMark(id, fuel);
      },
    }),
    [
      stations,
      status,
      error,
      loadStations,
      marks,
      favorites,
      addMark,
      toggleFavorite,
      favoritesVersion,
      marksVersion,
    ]
  );

  return (
    <StationsContext.Provider value={value}>{children}</StationsContext.Provider>
  );
}

export function useStations() {
  const ctx = useContext(StationsContext);
  if (!ctx) {
    throw new Error('useStations must be used within StationsProvider');
  }
  return ctx;
}
