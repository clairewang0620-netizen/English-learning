import React, { useState, useMemo } from 'react';
import { Word } from '../types';
import { playText } from '../services/audioService';
import { CATEGORIES, getCategoryColor } from '../constants';

interface VocabularyProps {
  words: Word[];
  onBack: () => void;
}

const Vocabulary: React.FC<VocabularyProps> = ({ words, onBack }) => {
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [hideMeanings, setHideMeanings] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handlePlay = async (text: string, id: string) => {
    setIsPlaying(id);
    try {
      await playText(text);
    } finally {
      setIsPlaying(null);
    }
  };

  const filteredWords = useMemo(() => {
    if (selectedCategories.length === 0) return words;
    return words.filter(w => 
      w.categories?.some(cat => selectedCategories.includes(cat))
    );
  }, [words, selectedCategories]);

  const groupedFilteredWords = useMemo(() => {
    const groups: { [key: number]: Word[] } = {};
    filteredWords.forEach(word => {
      const originalIndex = words.findIndex(w => w.id === word.id);
      const groupNum = Math.floor(originalIndex / 20) + 1;
      if (!groups[groupNum]) groups[groupNum] = [];
      groups[groupNum].push(word);
    });
    return groups;
  }, [filteredWords, words]);

  if (selectedWord) {
    return (
      <div className="flex-1 flex flex-col p-6 animate-in fade-in zoom-in duration-300 bg-white">
        <button 
          onClick={() => setSelectedWord(null)}
          className="flex items-center text-slate-500 mb-8 hover:text-emerald-600 transition-colors font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to List
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 flex-1 flex flex-col overflow-hidden">
          <div className="flex justify-between items-start mb-8">
            <div className="flex-1">
              <h3 className="text-5xl font-bold text-slate-900 mb-2">{selectedWord.word}</h3>
              <p className="text-emerald-500 font-mono text-xl">{selectedWord.ipa}</p>
              <div className="flex gap-2 mt-4 flex-wrap">
                {selectedWord.categories?.map(cat => (
                  <span key={cat} className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${getCategoryColor(cat)}`}>
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            <button 
              onClick={() => handlePlay(selectedWord.word, 'main')}
              className={`w-16 h-16 rounded-2xl bg-emerald-600 text-white shadow-lg transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center ${isPlaying === 'main' ? 'animate-pulse' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            </button>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl mb-10">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Meaning</span>
            <p className="text-2xl text-slate-800 font-semibold">{selectedWord.meaning}</p>
          </div>

          <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pr-2">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">Contextual Usage</h4>
            {selectedWord.examples && selectedWord.examples.map((ex, idx) => (
                <div key={idx} className="group p-5 bg-white border border-slate-100 rounded-2xl hover:border-emerald-200 hover:bg-emerald-50/30 transition-all relative">
                  <button 
                    onClick={() => handlePlay(ex.sentence, `ex-${idx}`)}
                    className={`absolute right-4 top-4 transition-all ${isPlaying === `ex-${idx}` ? 'text-emerald-600' : 'text-slate-300 hover:text-emerald-600'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  </button>
                  <p className="text-lg text-slate-800 leading-relaxed mb-2 pr-10 font-medium">{ex.sentence}</p>
                  <p className="text-sm text-slate-500">{ex.translation}</p>
                </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      <div className="p-6 border-b sticky top-0 bg-white/95 backdrop-blur-sm z-[15]">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">Vocabulary</h3>
            <p className="text-slate-400 text-sm">Target: Master all Core Groups (1-16)</p>
          </div>
          <button 
            onClick={() => setHideMeanings(!hideMeanings)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${hideMeanings ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-white text-slate-600 border-slate-200'}`}
          >
            {hideMeanings ? 'Show Meanings' : 'Hide Meanings'}
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar -mx-1 px-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${selectedCategories.includes(cat) ? 'bg-emerald-600 border-transparent shadow-md text-white' : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-slate-300'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {Object.keys(groupedFilteredWords).length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <p className="text-slate-500 font-medium">No words found matching these filters.</p>
            <button onClick={() => setSelectedCategories([])} className="mt-4 text-emerald-600 text-sm font-bold">Clear All Filters</button>
          </div>
        ) : (
          Object.entries(groupedFilteredWords).sort((a, b) => Number(a[0]) - Number(b[0])).map(([groupNum, groupWords]) => (
            <div key={groupNum} className="mb-2">
              <div className="px-6 py-3 bg-emerald-50/50 border-y border-emerald-100">
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">🟢 Vocabulary Group {groupNum}</span>
              </div>
              <div className="divide-y divide-slate-100">
                {groupWords.map((word) => (
                  <div 
                    key={word.id} 
                    className="group flex items-center justify-between p-6 hover:bg-slate-50 transition-all cursor-pointer"
                    onClick={() => setSelectedWord(word)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{word.word}</span>
                        <span className="text-sm font-mono text-slate-300">{word.ipa}</span>
                        <div className="flex gap-1">
                           {word.categories?.map(cat => (
                             <div key={cat} className={`w-2 h-2 rounded-full ${getCategoryColor(cat).split(' ')[1]}`} title={cat}></div>
                           ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className={`text-slate-500 text-sm transition-all duration-300 ${hideMeanings ? 'opacity-0 blur-sm' : 'opacity-100'}`}>
                          {word.meaning}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlay(word.word, word.id);
                      }}
                      className={`w-12 h-12 rounded-xl bg-slate-100 text-slate-400 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center ${isPlaying === word.id ? 'bg-emerald-600 text-white animate-pulse' : ''}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Vocabulary;