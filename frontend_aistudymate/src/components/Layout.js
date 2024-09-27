import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="app-layout">
      <header>
        <div className="menu-logo">
          <button className="menu-icon" aria-label="Menu">
            <span role="img" aria-label="Menu">☰</span>
          </button>
          <span className="logo-text">AI STUDYMATE</span>
        </div>
        <nav>
          <ul>
            <li><Link to="/home">HOME</Link></li>
            <li><Link to="/study-plan">STUDY PLAN</Link></li>
            <li><Link to="/test">TEST</Link></li>
            <li><Link to="/upload">UPLOAD</Link></li>
            <li><Link to="/course">COURSE</Link></li>
            <li><Link to="/help">HELP</Link></li>
          </ul>
        </nav>
        <div className="user-actions">
          <button className="language-selector" aria-label="Change language">
            <span role="img" aria-label="Globe">🌐</span> English
          </button>
          <button className="facebook-icon" aria-label="Facebook">f</button>
          <button className="google-icon" aria-label="Google">G</button>
          <button className="user-icon" aria-label="User profile">
            <span role="img" aria-label="User">👤</span>
          </button>
          <button className="menu-icon" aria-label="Menu">
            <span role="img" aria-label="Menu">☰</span>
          </button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;