import React from 'react';
import { AppRoute } from '../types';

interface HomeProps {
  onNavigate: (route: AppRoute) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="flex-1 flex flex-col px-8 py-10 justify-center">
      <div className="text-center mb-12 animate-in">
        <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-indigo-100">
          Professional English Suite
        </div>
        <h2 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
          Master English with <br/>
          <span className="text-emerald-600">Native Accuracy</span>
        </h2>
        <p className="text-lg text-slate-500 max-w-md mx-auto leading-relaxed">
          The ultimate closed-loop experience: Immersive Vocabulary, Adaptive Dictation, and Curated Reading.
        </p>
      </div>

      <div className="grid gap-5 animate-in" style={{ animationDelay: '0.1s' }}>
        <button 
          onClick={() => onNavigate(AppRoute.VOCABULARY)}
          className="group flex items-center gap-6 p-6 bg-white border border-slate-100 hover:border-emerald-500 rounded-3xl shadow-sm hover:shadow-xl transition-all text-left"
        >
          <div className="w-16 h-16 bg-emerald-50 group-hover:bg-emerald-600 flex items-center justify-center rounded-2xl text-emerald-600 group-hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900">Vocabulary</h3>
            <p className="text-slate-400 text-sm">600+ target words. Native IPA, examples, and instant playback.</p>
          </div>
        </button>

        <button 
          onClick={() => onNavigate(AppRoute.DICTATION)}
          className="group flex items-center gap-6 p-6 bg-white border border-slate-100 hover:border-indigo-500 rounded-3xl shadow-sm hover:shadow-xl transition-all text-left"
        >
          <div className="w-16 h-16 bg-indigo-50 group-hover:bg-indigo-600 flex items-center justify-center rounded-2xl text-indigo-600 group-hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900">Dictation</h3>
            <p className="text-slate-400 text-sm">Intensive groups. Build your custom Wrong Words book.</p>
          </div>
        </button>

        <button 
          onClick={() => onNavigate(AppRoute.READING)}
          className="group flex items-center gap-6 p-6 bg-white border border-slate-100 hover:border-purple-500 rounded-3xl shadow-sm hover:shadow-xl transition-all text-left"
        >
          <div className="w-16 h-16 bg-purple-50 group-hover:bg-purple-600 flex items-center justify-center rounded-2xl text-purple-600 group-hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900">Curated Reading</h3>
            <p className="text-slate-400 text-sm">High-level articles. Native paragraph audio and shadowing.</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Home;