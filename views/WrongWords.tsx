
import React, { useState } from 'react';
import { Word } from '../types';
import { playText } from '../services/audioService';

interface WrongWordsProps {
  words: Word[];
  onRemove: (id: string) => void;
  onBack: () => void;
}

const WrongWords: React.FC<WrongWordsProps> = ({ words, onRemove, onBack }) => {
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const handlePlay = async (text: string, id: string) => {
    setIsPlaying(id);
    try {
      await playText(text);
    } finally {
      setIsPlaying(null);
    }
  };

  if (selectedWord) {
    return (
      <div className="flex-1 flex flex-col p-6 animate-in slide-in-from-right duration-300">
        <button 
          onClick={() => setSelectedWord(null)}
          className="flex items-center text-indigo-600 mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to list
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-red-50 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">{selectedWord.word}</h3>
              <p className="text-red-400 font-mono text-lg">{selectedWord.ipa}</p>
            </div>
            <button 
              onClick={() => handlePlay(selectedWord.word, 'main')}
              className={`p-4 rounded-2xl bg-indigo-600 text-white shadow-lg transition-all ${isPlaying === 'main' ? 'animate-pulse' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            </button>
          </div>

          <p className="text-2xl text-gray-800 font-medium mb-12 py-4 border-y border-gray-100">
            {selectedWord.meaning}
          </p>

          <div className="space-y-8 flex-1 overflow-y-auto">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400">Contextual Examples</h4>
            {selectedWord.examples.map((ex, idx) => (
              <div key={idx} className="group p-4 bg-gray-50 rounded-2xl hover:bg-red-50 transition-colors relative">
                <p className="text-lg text-gray-800 leading-relaxed mb-2 pr-10">{ex.sentence}</p>
                <p className="text-sm text-gray-500">{ex.translation}</p>
              </div>
            ))}
          </div>

          <button 
            onClick={() => {
              onRemove(selectedWord.id);
              setSelectedWord(null);
            }}
            className="mt-8 w-full py-4 bg-green-500 text-white font-bold rounded-2xl shadow-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Mastered & Remove
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="p-6 border-b sticky top-0 bg-white/95 backdrop-blur-sm z-[5] flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-1">Wrong Words</h3>
          <p className="text-gray-500 text-sm">{words.length} items to review</p>
        </div>
        <button onClick={onBack} className="text-indigo-600 font-bold text-sm underline underline-offset-4">Return</button>
      </div>

      {words.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
          <div className="w-20 h-20 bg-green-50 text-green-400 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 className="text-xl font-bold mb-2">Excellent! No Mistakes</h4>
          <p className="text-gray-400">Keep practicing to build your vocabulary.</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {words.map((word) => (
            <div 
              key={word.id} 
              className="group flex items-center justify-between p-6 hover:bg-red-50/30 transition-colors cursor-pointer"
              onClick={() => setSelectedWord(word)}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xl font-bold text-gray-900">{word.word}</span>
                  <span className="text-sm font-mono text-red-300">{word.ipa}</span>
                </div>
                <p className="text-gray-500">{word.meaning}</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(word.id);
                  }}
                  className="p-3 rounded-xl bg-gray-50 text-gray-300 hover:text-green-500 hover:bg-green-50 transition-all"
                  title="Mark as mastered"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <div className="p-3 rounded-xl bg-gray-100 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WrongWords;
