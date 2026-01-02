
import React from 'react';
import { AppRoute } from '../types';

interface HomeProps {
  onNavigate: (route: AppRoute) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="flex-1 flex flex-col px-8 py-12 justify-center">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Master English with <span className="text-emerald-600">Native Sounds</span></h2>
        <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
          Authentic pronunciation, immediate playback, and a perfect learning loop of Vocabulary, Dictation, and Reading.
        </p>
      </div>

      <div className="grid gap-6">
        <button 
          onClick={() => onNavigate(AppRoute.VOCABULARY)}
          className="group flex items-center gap-6 p-6 bg-white border-2 border-slate-100 hover:border-emerald-500 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 text-left"
        >
          <div className="w-16 h-16 bg-emerald-50 group-hover:bg-emerald-600 transition-colors flex items-center justify-center rounded-2xl text-emerald-600 group-hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Vocabulary</h3>
            <p className="text-gray-500 text-sm">1000+ high-frequency terms. Native IPA and example sentences.</p>
          </div>
        </button>

        <button 
          onClick={() => onNavigate(AppRoute.DICTATION)}
          className="group flex items-center gap-6 p-6 bg-white border-2 border-slate-100 hover:border-indigo-500 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 text-left"
        >
          <div className="w-16 h-16 bg-indigo-50 group-hover:bg-indigo-600 transition-colors flex items-center justify-center rounded-2xl text-indigo-600 group-hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Dictation</h3>
            <p className="text-gray-500 text-sm">Listen and write. Adaptive logic that tracks your persistent mistakes.</p>
          </div>
        </button>

        <button 
          onClick={() => onNavigate(AppRoute.READING)}
          className="group flex items-center gap-6 p-6 bg-white border-2 border-slate-100 hover:border-purple-500 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 text-left"
        >
          <div className="w-16 h-16 bg-purple-50 group-hover:bg-purple-600 transition-colors flex items-center justify-center rounded-2xl text-purple-600 group-hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Curated Reading</h3>
            <p className="text-gray-500 text-sm">Full audio articles. Paragraph-level shadowing with recording.</p>
          </div>
        </button>
      </div>

      <div className="mt-12 flex justify-center gap-4">
        <div className="flex items-center px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
          <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
          Instant Audio
        </div>
        <div className="flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider">
          Zero Latency
        </div>
      </div>
    </div>
  );
};

export default Home;
