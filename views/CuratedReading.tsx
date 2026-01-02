
import React, { useState, useRef, useEffect } from 'react';
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
  const isCanceledRef = useRef(false);

  const activeArticle = articles.find(a => a.id === activeArticleId);

  useEffect(() => {
    return () => {
      isCanceledRef.current = true;
      stopCurrentAudio();
    };
  }, []);

  const toggleTranslation = (id: string) => {
    setShowTranslation(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePlaySegment = async (text: string, id: string) => {
    isCanceledRef.current = true; // Stop any full article playback loop
    setIsFullArticlePlaying(false);
    stopCurrentAudio();
    setPlayingId(id);
    try {
      await playText(text);
    } finally {
      if (playingId === id) setPlayingId(null);
    }
  };

  const startRecording = async (id: string) => {
    isCanceledRef.current = true;
    setIsFullArticlePlaying(false);
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
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  const playBackUser = async (id: string) => {
    isCanceledRef.current = true;
    setIsFullArticlePlaying(false);
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
    isCanceledRef.current = false;
    
    try {
      for (const segment of activeArticle.segments) {
        if (isCanceledRef.current) break;
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
      <div className="flex-1 flex flex-col bg-white overflow-hidden animate-in fade-in duration-300">
        <div className="p-4 border-b flex items-center justify-between bg-white/95 backdrop-blur-md sticky top-0 z-[20]">
          <button 
            onClick={() => {
              isCanceledRef.current = true;
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
            className={`px-6 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 transition-all shadow-sm ${isFullArticlePlaying ? 'bg-indigo-50 text-indigo-400 border border-indigo-100' : 'bg-slate-900 text-white hover:bg-indigo-600 shadow-xl active:scale-95'}`}
          >
            {isFullArticlePlaying ? (
              <>
                <div className="flex gap-1">
                  <span className="w-1 h-3 bg-indigo-400 animate-pulse"></span>
                  <span className="w-1 h-3 bg-indigo-400 animate-pulse delay-75"></span>
                  <span className="w-1 h-3 bg-indigo-400 animate-pulse delay-150"></span>
                </div>
                Reading Full...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Listen Full Article
              </>
            )}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-10 custom-scrollbar bg-slate-50/30">
          <div className="mb-14 text-center">
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4">{activeArticle.source}</span>
            <h2 className="text-4xl font-black text-slate-900 leading-tight font-serif max-w-lg mx-auto">{activeArticle.title}</h2>
          </div>
          
          <div className="space-y-20 mb-20">
            {activeArticle.segments.map((seg) => (
              <div key={seg.id} className="group flex flex-col gap-6 relative">
                <div className="flex flex-col gap-4">
                  <p className={`text-xl leading-[1.8] text-slate-800 transition-all duration-500 rounded-3xl p-6 shadow-sm border border-slate-100 ${playingId === seg.id ? 'bg-indigo-600 text-white scale-[1.02] shadow-2xl z-10' : 'bg-white'}`}>
                    {seg.text}
                  </p>
                  {showTranslation[seg.id] && (
                    <p className="text-lg leading-relaxed text-slate-400 italic px-6 animate-in fade-in slide-in-from-top-4 duration-500">
                      {seg.translation}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center gap-3 flex-wrap px-2">
                  <button 
                    onClick={() => handlePlaySegment(seg.text, seg.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${playingId === seg.id ? 'bg-indigo-700 text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                    Native Audio
                  </button>

                  <button 
                    onMouseDown={() => startRecording(seg.id)}
                    onMouseUp={stopRecording}
                    onTouchStart={() => startRecording(seg.id)}
                    onTouchEnd={stopRecording}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${recordingId === seg.id ? 'bg-red-600 text-white animate-pulse shadow-lg' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200'}`}
                  >
                    <div className={`w-2 h-2 rounded-full ${recordingId === seg.id ? 'bg-white' : 'bg-red-500'} mr-1`}></div>
                    {recordingId === seg.id ? 'Recording Now...' : 'Hold to Shadow'}
                  </button>

                  <button 
                    onClick={() => toggleTranslation(seg.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${showTranslation[seg.id] ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-400 hover:bg-slate-100 border border-slate-200'}`}
                  >
                    {showTranslation[seg.id] ? 'Hide' : 'Translate'}
                  </button>

                  {userRecordings[seg.id] && (
                    <button 
                      onClick={() => playBackUser(seg.id)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${playingId === `user-${seg.id}` ? 'bg-amber-500 text-white shadow-lg' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      My Voice
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 rounded-[3rem] p-10 mb-20 text-white shadow-3xl border-4 border-slate-800">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tight text-white leading-none">Key Structures</h3>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Study 8-10 high-value items</p>
              </div>
            </div>

            <div className="grid gap-4">
              {activeArticle.keyPhrases.map((kp, idx) => (
                <div key={idx} className="flex items-center justify-between p-5 bg-white/5 rounded-3xl hover:bg-white/10 transition-all border border-white/5 group">
                  <div className="flex-1">
                    <span className="text-emerald-400 font-black block text-base mb-1 group-hover:text-white transition-colors">{kp.phrase}</span>
                    <span className="text-slate-500 text-sm font-medium">{kp.meaning}</span>
                  </div>
                  <button 
                    onClick={() => handlePlaySegment(kp.phrase, `kp-${idx}`)}
                    className={`w-12 h-12 rounded-2xl transition-all flex items-center justify-center ${playingId === `kp-${idx}` ? 'bg-emerald-500 text-white' : 'bg-white/10 text-slate-400 hover:bg-emerald-500 hover:text-white hover:scale-110 active:scale-90'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
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
    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden animate-in fade-in duration-500">
      <div className="p-10 pb-6">
        <h3 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Curated Reading</h3>
        <p className="text-slate-500 font-medium">Standardized 3-5 min professional articles.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {articles.map((article) => (
          <div 
            key={article.id}
            onClick={() => onSelectArticle(article.id)}
            className="group p-8 bg-white border border-slate-100 hover:border-indigo-500 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center justify-between mb-6 relative z-10">
              <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100">{article.source}</span>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-lg">3-5 Mins</span>
                <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-12 transition-all shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
            <h4 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors font-serif leading-tight relative z-10">
              {article.title}
            </h4>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed group-hover:text-slate-600 transition-colors relative z-10">
              {article.segments[0].text.substring(0, 100)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CuratedReading;
