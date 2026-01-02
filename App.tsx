
import React, { useState, useEffect, useCallback } from 'react';
import { AppRoute, Word, Article } from './types';
import { INITIAL_WORDS, INITIAL_ARTICLES } from './constants';
import Home from './views/Home';
import Vocabulary from './views/Vocabulary';
import Dictation from './views/Dictation';
import CuratedReading from './views/CuratedReading';
import WrongWords from './views/WrongWords';
import { stopCurrentAudio } from './services/audioService';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.HOME);
  const [words, setWords] = useState<Word[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [wrongWords, setWrongWords] = useState<Word[]>([]);
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);

  useEffect(() => {
    // Load initial data
    setWords(INITIAL_WORDS);
    setArticles(INITIAL_ARTICLES);
    
    // Load wrong words from local storage if any
    const saved = localStorage.getItem('fluent_echo_wrong_words');
    if (saved) {
      setWrongWords(JSON.parse(saved));
    }
  }, []);

  const addToWrongWords = useCallback((word: Word) => {
    setWrongWords(prev => {
      if (prev.find(w => w.id === word.id)) return prev;
      const updated = [...prev, word];
      localStorage.setItem('fluent_echo_wrong_words', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeFromWrongWords = useCallback((wordId: string) => {
    setWrongWords(prev => {
      const updated = prev.filter(w => w.id !== wordId);
      localStorage.setItem('fluent_echo_wrong_words', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const navigate = (route: AppRoute) => {
    stopCurrentAudio();
    setCurrentRoute(route);
  };

  const renderRoute = () => {
    switch (currentRoute) {
      case AppRoute.HOME:
        return <Home onNavigate={navigate} />;
      case AppRoute.VOCABULARY:
        return <Vocabulary words={words} onBack={() => navigate(AppRoute.HOME)} />;
      case AppRoute.DICTATION:
        return (
          <Dictation 
            words={words} 
            onAddWrongWord={addToWrongWords} 
            onNavigateToWrongWords={() => navigate(AppRoute.WRONG_WORDS)}
            onBack={() => navigate(AppRoute.HOME)} 
          />
        );
      case AppRoute.READING:
        return (
          <CuratedReading 
            articles={articles} 
            activeArticleId={activeArticleId}
            onSelectArticle={setActiveArticleId}
            onBack={() => navigate(AppRoute.HOME)} 
          />
        );
      case AppRoute.WRONG_WORDS:
        return (
          <WrongWords 
            words={wrongWords} 
            onRemove={removeFromWrongWords}
            onBack={() => navigate(AppRoute.DICTATION)} 
          />
        );
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen max-w-2xl mx-auto shadow-xl bg-white flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <header className="px-6 py-4 border-b flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => navigate(AppRoute.HOME)}
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">F</div>
          <h1 className="text-xl font-bold tracking-tight text-indigo-900">FluentEcho</h1>
        </div>
        {currentRoute !== AppRoute.HOME && (
          <button 
            onClick={() => navigate(AppRoute.HOME)}
            className="text-gray-500 hover:text-indigo-600 p-2 rounded-full hover:bg-indigo-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>
        )}
      </header>

      <main className="flex-1 overflow-y-auto p-0 flex flex-col">
        {renderRoute()}
      </main>
    </div>
  );
};

export default App;
