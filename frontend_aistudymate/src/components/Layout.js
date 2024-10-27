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
          <a href="https://www.facebook.com/profile.php?id=61566437575147" className="facebook-icon" aria-label="Facebook" target="_blank" rel="noopener noreferrer">FaceBook</a>
          {/* <a href="https://www.facebook.com/profile.php?id=61566437575147" className="google-icon" aria-label="Google" target="_blank" rel="noopener noreferrer">G</a> */}
          <a href="https://www.facebook.com/profile.php?id=61566437575147" className="user-icon" aria-label="User profile" target="_blank" rel="noopener noreferrer">
            <span role="img" aria-label="User">👤</span>
          </a>
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