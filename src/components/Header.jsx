import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink to="/" className="logo" aria-label="FuelSearch66 — на главную">
          <span className="logo-mark" aria-hidden="true">
            66
          </span>
          <span className="logo-text">FuelSearch66</span>
        </NavLink>
        <nav className="main-nav" aria-label="Основная навигация">
          <ul>
            <li>
              <NavLink to="/" end>
                Карта
              </NavLink>
            </li>
            <li>
              <NavLink to="/favorites">Избранное</NavLink>
            </li>
            <li>
              <NavLink to="/about">О проекте</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
