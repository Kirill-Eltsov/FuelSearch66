import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import HomePage from './pages/HomePage.jsx';
import StationDetailsPage from './pages/StationDetailsPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main id="main" className="container app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/station/:id" element={<StationDetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
