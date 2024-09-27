import React from 'react';
import logo from '../assets/ai-studymate-logo.png';

function AIStudymatePage() {
  return (
    <div className="ai-studymate-page">
      <img src={logo} alt="AI Studymate Logo" className="main-logo" />
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button className="clear-search" aria-label="Clear search">×</button>
      </div>
    </div>
  );
}

export default AIStudymatePage;