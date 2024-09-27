import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Xóa dòng import Link
import Layout from './components/Layout';
import AIStudymatePage from './components/AIStudymatePage';
import HomePage from './components/HomePage';
import StudyPlanPage from './components/StudyPlanPage';
import TestPage from './components/TestPage';
import UploadPage from './components/UploadPage';
import CoursePage from './components/CoursePage';
import HelpPage from './components/HelpPage';
import './App.css';

// ... rest of the code

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AIStudymatePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="study-plan" element={<StudyPlanPage />} />
          <Route path="test" element={<TestPage />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="course" element={<CoursePage />} />
          <Route path="help" element={<HelpPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;