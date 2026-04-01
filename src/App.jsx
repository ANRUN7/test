import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LearningPathPage from './pages/LearningPathPage';
import AlphabetLessonPage from './pages/AlphabetLessonPage';
import VocabularyLessonPage from './pages/VocabularyLessonPage';
import SentenceLessonPage from './pages/SentenceLessonPage';
import ListeningLessonPage from './pages/ListeningLessonPage';
import SpeakingLessonPage from './pages/SpeakingLessonPage';
import IPALessonPage from './pages/IPALessonPage';
import ProgressPage from './pages/ProgressPage';
import Header from './components/Header';
import './App.css';

const App = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/learning-path" element={<LearningPathPage />} />
            <Route path="/alphabet" element={<AlphabetLessonPage />} />
            <Route path="/vocabulary" element={<VocabularyLessonPage />} />
            <Route path="/sentences" element={<SentenceLessonPage />} />
            <Route path="/listening" element={<ListeningLessonPage />} />
            <Route path="/speaking" element={<SpeakingLessonPage />} />
            <Route path="/ipa" element={<IPALessonPage />} />
            <Route path="/progress" element={<ProgressPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;