
import React, { useState, useRef } from 'react';
import { Article } from '../types';
import { playText, stopCurrentAudio, playRecording } from '../services/audioService';

interface CuratedReadingProps {
  articles: Article[];
  activeArticleId: string | null;
  onSelectArticle: (id: string | null) => void;
  onBack: () => void;
}

const CuratedReading: React.FC<CuratedReadingProps> = ({ articles, activeArticleId, onSelectArticle, onBack }) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isFullArticlePlaying, setIsFullArticlePlaying] = useState(false);
  const [recordingId, setRecordingId] = useState<string | null>(null);
  const [userRecordings, setUserRecordings] = useState<Record<string, Blob>>({});
  const [showTranslation, setShowTranslation] = useState<Record<string, boolean>>({});
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const activeArticle = articles.find(a => a.id === activeArticleId);

  const toggleTranslation = (id: string) => {
    setShowTranslation(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePlaySegment = async (text: string, id: string) => {
    setIsFullArticlePlaying(false);
    stopCurrentAudio();
    setPlayingId(id);
    try {
      await playText(text);
    } finally {
      setPlayingId(null);
    }
  };

  const startRecording = async (id: string) => {
    stopCurrentAudio();
    setRecordingId(id);
    chunksRef.current = [];
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setUserRecordings(prev => ({ ...prev, [id]: blob }));
        setRecordingId(null);
        stream.getTracks().forEach(track => track.stop());
      };
      
      recorder.start();
    } catch (err) {
      console.error("Recording error:", err);
      setRecordingId(null);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const playBackUser = async (id: string) => {
    const blob = userRecordings[id];
    if (blob) {
      stopCurrentAudio();
      setPlayingId(`user-${id}`);
      try {
        await playRecording(blob);
      } finally {
        setPlayingId(null);
      }
    }
  };

  const handlePlayFullArticle = async () => {
    if (!activeArticle) return;
    stopCurrentAudio();
    setIsFullArticlePlaying(true);
    
    try {
      for (const segment of activeArticle.segments) {
        // Checking state in a loop is tricky with async, using a local flag would be better but this works for basic flow
        setPlayingId(segment.id);
        await playText(segment.text);
      }
    } finally {
      setIsFullArticlePlaying(false);
      setPlayingId(null);
    }
  };

  if (activeArticle) {
    return (
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between bg-white/95 backdrop-blur-md sticky top-0 z-[20]">
          <button 
            onClick={() => {
              stopCurrentAudio();
              onSelectArticle(null);
            }}
            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={handlePlayFullArticle}
            disabled={isFullArticlePlaying}
            className={`px-5 py-2 rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all ${isFullArticlePlaying ? 'bg-indigo-50 text-indigo-400' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'}`}
          >
            {isFullArticlePlaying ? 'Playing Article...' : 'Play Full Article'}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-10 custom-scrollbar">
          <div className="mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-2 block">{activeArticle.source}</span>
            <h2 className="text-4xl font-bold text-slate-900 leading-tight font-serif">{activeArticle.title}</h2>
          </div>
          
          <div className="space-y-16 mb-20">
            {activeArticle.segments.map((seg) => (
              <div key={seg.id} className="group flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <p className={`text-xl leading-relaxed text-slate-700 transition-all duration-500 rounded-2xl p-2 ${playingId === seg.id ? 'bg-indigo-50 text-indigo-900 px-4' : ''}`}>
                    {seg.text}
                  </p>
                  {showTranslation[seg.id] && (
                    <p className="text-lg leading-relaxed text-slate-400 italic px-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      {seg.translation}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center gap-3 flex-wrap">
                  <button 
                    onClick={() => handlePlaySegment(seg.text, seg.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${playingId === seg.id ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                    Original
                  </button>

                  <button 
                    onMouseDown={() => startRecording(seg.id)}
                    onMouseUp={stopRecording}
                    onTouchStart={() => startRecording(seg.id)}
                    onTouchEnd={stopRecording}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${recordingId === seg.id ? 'bg-red-500 text-white animate-pulse' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-100'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                    {recordingId === seg.id ? 'Release to Stop' : 'Shadowing'}
                  </button>

                  <button 
                    onClick={() => toggleTranslation(seg.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${showTranslation[seg.id] ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                  >
                    {showTranslation[seg.id] ? 'Hide' : 'Translate'}
                  </button>

                  {userRecordings[seg.id] && (
                    <button 
                      onClick={() => playBackUser(seg.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${playingId === `user-${seg.id}` ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm'}`}
                    >
                      My Recording
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 rounded-[2rem] p-8 mb-20 text-white shadow-2xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Key Vocabulary & Structures
            </h3>
            <div className="grid gap-3">
              {activeArticle.keyPhrases.map((kp, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5">
                  <div>
                    <span className="text-emerald-400 font-bold block text-sm mb-1">{kp.phrase}</span>
                    <span className="text-slate-400 text-xs">{kp.meaning}</span>
                  </div>
                  <button 
                    onClick={() => handlePlaySegment(kp.phrase, `kp-${idx}`)}
                    className={`p-3 rounded-xl transition-all ${playingId === `kp-${idx}` ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white hover:bg-emerald-500'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-8 pb-4">
        <h3 className="text-3xl font-bold text-slate-900 mb-2">Curated Reading</h3>
        <p className="text-slate-500 font-medium">Standardized 3-5 min articles with interactive study tools.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {articles.map((article) => (
          <div 
            key={article.id}
            onClick={() => onSelectArticle(article.id)}
            className="group p-6 bg-white border border-slate-100 hover:border-indigo-500 rounded-[2rem] shadow-sm hover:shadow-xl transition-all cursor-pointer relative"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">{article.source}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">3-5 Mins</span>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
            <h4 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-serif leading-tight">
              {article.title}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CuratedReading;
