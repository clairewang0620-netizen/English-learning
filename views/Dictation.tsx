import React, { useState, useEffect, useRef } from 'react';
import { Word } from '../types';
import { playText, stopCurrentAudio } from '../services/audioService';

interface DictationProps {
  words: Word[];
  onAddWrongWord: (word: Word) => void;
  onNavigateToWrongWords: () => void;
  onBack: () => void;
}

const Dictation: React.FC<DictationProps> = ({ words, onAddWrongWord, onNavigateToWrongWords, onBack }) => {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const groupSize = 20;
  // Calculate total groups dynamically based on word count (320 words = 16 groups)
  const groupsCount = Math.ceil(words.length / groupSize);
  
  const currentGroupWords = selectedGroup !== null 
    ? words.slice((selectedGroup - 1) * groupSize, selectedGroup * groupSize)
    : [];

  const currentWord = currentGroupWords[currentIndex];

  const handlePlay = async () => {
    if (!currentWord || isPlaying) return;
    setIsPlaying(true);
    try {
      await playText(currentWord.word);
    } catch (err) {
      console.error("Dictation audio play failed:", err);
    } finally {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (selectedGroup !== null && currentWord && !isFinished) {
      handlePlay();
      setUserInput('');
      setIsCorrect(null);
      setShowHint(false);
      const timer = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isFinished, selectedGroup]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isCorrect !== null) return;

    const correct = userInput.toLowerCase().trim() === currentWord.word.toLowerCase().trim();
    setIsCorrect(correct);
  };

  const handleNext = () => {
    stopCurrentAudio(); 
    if (currentIndex < currentGroupWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleMistake = () => {
    onAddWrongWord(currentWord);
    handleNext();
  };

  if (selectedGroup === null) {
    return (
      <div className="flex-1 flex flex-col p-6 bg-slate-50 min-h-[600px]">
        <h3 className="text-3xl font-bold text-slate-900 mb-6">Dictation Groups</h3>
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
          <div className="grid grid-cols-1 gap-4 pb-12">
            {Array.from({ length: groupsCount }, (_, i) => i + 1).map(num => (
              <button
                key={num}
                onClick={() => setSelectedGroup(num)}
                className="p-6 bg-white border border-slate-200 rounded-3xl text-left hover:border-emerald-500 hover:shadow-lg transition-all flex justify-between items-center group"
              >
                <div>
                  <span className="text-xs font-black text-emerald-500 uppercase tracking-widest block mb-1">🟢 Dictation Task</span>
                  <span className="text-xl font-bold text-slate-800">Group {num}</span>
                  <p className="text-sm text-slate-400">Words {((num-1)*groupSize)+1} to {Math.min(num*groupSize, words.length)}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in zoom-in duration-500 bg-white">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mb-6 transform rotate-12 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold mb-2">Group {selectedGroup} Complete!</h3>
        <p className="text-slate-500 mb-10">You've mastered these 20 words. Keep going!</p>
        
        <div className="space-y-4 w-full max-w-xs">
          <button 
            onClick={() => {
              setCurrentIndex(0);
              setIsFinished(false);
            }}
            className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-xl hover:bg-emerald-700 transition-all active:scale-95"
          >
            Practice Group {selectedGroup} Again
          </button>
          <button 
            onClick={() => {
              setSelectedGroup(null);
              setCurrentIndex(0);
              setIsFinished(false);
            }}
            className="w-full py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
          >
            Switch to Another Group
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-6 bg-slate-50 min-h-[600px]">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
                stopCurrentAudio();
                setSelectedGroup(null);
            }}
            className="p-2 -ml-2 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-900 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="px-3 py-1 bg-white rounded-lg border border-slate-200 text-slate-600 font-bold shadow-sm text-sm">
            {currentIndex + 1} / {currentGroupWords.length}
          </div>
          <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
             <div className="h-full bg-emerald-600 transition-all duration-500" style={{ width: `${((currentIndex + 1) / currentGroupWords.length) * 100}%` }}></div>
          </div>
        </div>
        <div className="text-xs font-black text-slate-300 uppercase tracking-widest">Group {selectedGroup}</div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl flex-1 flex flex-col items-center justify-center relative overflow-hidden border border-slate-100">
        <button 
          onClick={handlePlay}
          disabled={isPlaying}
          className={`w-24 h-24 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-2xl mb-10 transform transition-all active:scale-90 hover:scale-110 ${isPlaying ? 'animate-pulse' : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        </button>

        <div className="w-full text-center mb-10 min-h-[5rem] flex flex-col items-center justify-center">
          {showHint || isCorrect === false ? (
            <div className="animate-in fade-in slide-in-from-bottom duration-300">
              <p className="text-xl font-semibold text-slate-800">{currentWord?.meaning}</p>
              <p className="text-sm text-emerald-400 font-mono mt-1">{currentWord?.ipa}</p>
            </div>
          ) : (
            <button 
              onClick={() => setShowHint(true)}
              className="px-6 py-2 bg-slate-50 text-slate-400 rounded-full hover:text-emerald-600 transition-all text-sm font-medium border border-slate-100"
            >
              Show Hint
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="w-full max-sm:max-w-xs max-w-sm">
          <div className="mb-8">
            <input 
              ref={inputRef}
              type="text" 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Spell it..."
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isCorrect !== null}
              className={`w-full bg-slate-50 border-2 rounded-2xl px-6 py-5 text-2xl font-bold text-center focus:outline-none transition-all ${
                isCorrect === true ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 
                isCorrect === false ? 'border-red-400 text-red-600 bg-red-50' : 
                'border-transparent focus:border-emerald-400 focus:bg-white'
              }`}
            />
            {isCorrect === false && currentWord && (
              <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100 animate-in fade-in zoom-in duration-300">
                <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-1">Correct Spelling:</p>
                <p className="text-2xl font-black text-red-600 tracking-wider">{currentWord.word}</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {isCorrect === null ? (
              <button 
                type="submit"
                className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg hover:bg-emerald-700 transition-all active:scale-95"
              >
                Check Result
              </button>
            ) : isCorrect === true ? (
              <button 
                type="button"
                onClick={handleNext}
                className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-xl hover:bg-emerald-700 transition-all animate-in slide-in-from-bottom"
              >
                Continue &rarr;
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={handleMistake}
                  className="py-4 bg-red-600 text-white font-bold rounded-2xl shadow-lg hover:bg-red-700 transition-all"
                >
                  Add to Review
                </button>
                <button 
                  type="button"
                  onClick={handleNext}
                  className="py-4 bg-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-300 transition-all"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dictation;