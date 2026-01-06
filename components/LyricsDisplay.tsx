
import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Heart, Languages, Loader2, ChevronDown } from 'lucide-react';
import { Song, LyricLine } from '../types';
import { GoogleGenAI, Type } from "@google/genai";

interface LyricsDisplayProps {
  currentSong: Song;
  currentTime: number;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (time: number) => void;
  onLike: () => void;
}

const SUPPORTED_LANGUAGES = [
  { code: 'Indonesian', label: 'ID', name: 'Indonesian' },
  { code: 'Japanese', label: 'JA', name: 'Japanese' },
  { code: 'Korean', label: 'KO', name: 'Korean' },
  { code: 'Spanish', label: 'ES', name: 'Spanish' },
  { code: 'French', label: 'FR', name: 'French' },
  { code: 'German', label: 'DE', name: 'German' },
];

const LyricsDisplay: React.FC<LyricsDisplayProps> = ({
  currentSong,
  currentTime,
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  onSeek,
  onLike
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  
  // Translation state
  const [translatedLyrics, setTranslatedLyrics] = useState<LyricLine[] | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [targetLang, setTargetLang] = useState(SUPPORTED_LANGUAGES[0]);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  useEffect(() => {
    const index = currentSong.lyrics.findIndex((line, i) => {
      const nextLine = currentSong.lyrics[i + 1];
      return currentTime >= line.time && (!nextLine || currentTime < nextLine.time);
    });
    if (index !== -1) setActiveLineIndex(index);
  }, [currentTime, currentSong.lyrics]);

  // Reset translation when song changes
  useEffect(() => {
    setTranslatedLyrics(null);
    setShowTranslation(false);
  }, [currentSong.id]);

  useEffect(() => {
    const activeEl = document.getElementById(`lyric-line-${activeLineIndex}`);
    if (activeEl && scrollRef.current) {
      const containerHeight = scrollRef.current.clientHeight;
      scrollRef.current.scrollTo({
        top: activeEl.offsetTop - containerHeight / 2 + activeEl.clientHeight / 2,
        behavior: 'smooth'
      });
    }
  }, [activeLineIndex, showTranslation]);

  const handleTranslate = async (lang = targetLang) => {
    const apiKey = (window as any).process?.env?.API_KEY || "";
    
    if (!apiKey) {
      console.error("API Key is missing. Please check your environment variables.");
      return;
    }

    if (translatedLyrics && lang.code === targetLang.code && showTranslation) {
      setShowTranslation(false);
      return;
    }
    
    if (translatedLyrics && lang.code === targetLang.code && !showTranslation) {
      setShowTranslation(true);
      return;
    }

    setIsTranslating(true);
    setShowTranslation(false);
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Translate the following song lyrics into ${lang.name}. Return only the translated lines in a JSON array format, maintaining the exact same number of lines as provided.
      Lyrics:
      ${currentSong.lyrics.map(l => l.text).join('\n')}`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      });

      const translations: string[] = JSON.parse(response.text || "[]");
      
      if (translations.length === currentSong.lyrics.length) {
        const newTranslatedLyrics = currentSong.lyrics.map((line, i) => ({
          ...line,
          text: translations[i]
        }));
        setTranslatedLyrics(newTranslatedLyrics);
        setShowTranslation(true);
        setTargetLang(lang);
      }
    } catch (error) {
      console.error("Translation failed:", error);
    } finally {
      setIsTranslating(false);
      setIsLangMenuOpen(false);
    }
  };

  const selectLanguage = (lang: typeof SUPPORTED_LANGUAGES[0]) => {
    if (lang.code === targetLang.code && translatedLyrics) {
      setShowTranslation(!showTranslation);
      setIsLangMenuOpen(false);
    } else {
      handleTranslate(lang);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-135px)] max-w-md mx-auto p-4 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div 
        ref={scrollRef}
        className="relative flex-1 bg-slate-800/30 backdrop-blur-xl rounded-[32px] border border-slate-700/40 overflow-y-auto custom-scrollbar px-6 py-12 lyrics-mask text-center"
      >
        <div className="space-y-10">
          {currentSong.lyrics.map((line, idx) => {
            const isCurrent = idx === activeLineIndex;
            const isPast = idx < activeLineIndex;
            const translatedLine = translatedLyrics?.[idx];
            
            return (
              <div 
                key={idx}
                id={`lyric-line-${idx}`}
                onClick={() => onSeek(line.time)}
                className={`flex flex-col items-center gap-1.5 transition-all duration-700 leading-relaxed cursor-pointer active:scale-95 group/line ${
                  isCurrent ? 'scale-105' : 'scale-100 hover:scale-[1.02]'
                }`}
              >
                <div 
                  className={`transition-all duration-700 ${
                    isCurrent ? 'text-xl font-medium text-slate-100' :
                    isPast ? 'text-base text-slate-600/40 group-hover/line:text-slate-400/60' :
                    'text-base text-slate-600/35 group-hover/line:text-slate-400/60'
                  }`}
                  style={{ letterSpacing: isCurrent ? '-0.01em' : 'normal' }}
                >
                  {isCurrent ? (
                    <span className="inline-block">
                      {line.text.split('').map((char, i) => (
                        <span 
                          key={i} 
                          className="animate-in fade-in duration-300 inline-block whitespace-pre"
                          style={{ 
                            animationDelay: `${i * 30}ms`,
                            animationFillMode: 'both'
                          }}
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                  ) : line.text}
                </div>

                {showTranslation && translatedLine && (
                  <div 
                    className={`text-sm font-medium italic transition-all duration-700 px-4 ${
                      isCurrent ? 'text-slate-400 opacity-100 translate-y-0' :
                      isPast ? 'text-slate-500/20 opacity-30 -translate-y-1' :
                      'text-slate-500/20 opacity-30 -translate-y-1'
                    }`}
                  >
                    {translatedLine.text}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-5 pb-4">
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center justify-between w-full px-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">Now Playing</span>
            
            <div className="relative">
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-l-full text-[10px] font-bold uppercase tracking-wider transition-all border-r border-slate-700/50 ${
                    showTranslation 
                      ? 'bg-slate-200 text-slate-800' 
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {targetLang.label}
                  <ChevronDown size={10} className={`transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                <button 
                  onClick={() => handleTranslate()}
                  disabled={isTranslating}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-r-full text-[10px] font-bold uppercase tracking-wider transition-all active:scale-95 ${
                    showTranslation 
                      ? 'bg-slate-200 text-slate-800' 
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isTranslating ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <Languages size={12} />
                  )}
                  {isTranslating ? 'Translating...' : showTranslation ? 'Hide' : 'Translate'}
                </button>
              </div>

              {isLangMenuOpen && (
                <div className="absolute right-0 bottom-full mb-2 w-32 bg-slate-900/95 backdrop-blur-2xl border border-slate-700/50 rounded-xl shadow-2xl py-1 z-[60] animate-in fade-in slide-in-from-bottom-2 duration-200">
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => selectLanguage(lang)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold transition-colors ${
                        targetLang.code === lang.code ? 'text-slate-100 bg-slate-800/80' : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                      }`}
                    >
                      <span>{lang.name}</span>
                      <span className="text-[9px] opacity-40">{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full px-2 mt-2">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-700 shadow-xl flex items-center justify-center relative shrink-0 overflow-hidden`}>
                <div className={`w-8 h-8 rounded-full bg-slate-800/60 backdrop-blur-md border border-white/5 flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-900/80" />
                </div>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-semibold text-slate-100 truncate tracking-tight">{currentSong.title}</h2>
              <p className="text-xs text-slate-400 truncate mt-0.5">{currentSong.artist}</p>
            </div>
            <button 
              onClick={handleLike}
              className={`p-2 transition-all active:scale-125 ${isLiked ? 'text-red-400' : 'text-slate-500'}`}
            >
              <Heart size={20} fill={isLiked ? "currentColor" : "none"} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div className="space-y-2 px-2 group">
          <div 
            className="relative h-[2px] w-full bg-slate-700/50 rounded-full cursor-pointer overflow-visible"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              onSeek(((e.clientX - rect.left) / rect.width) * currentSong.duration);
            }}
          >
            <div 
              className="absolute h-full bg-slate-300 rounded-full transition-all duration-100" 
              style={{ width: `${(currentTime / currentSong.duration) * 100}%` }}
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-slate-100 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ left: `${(currentTime / currentSong.duration) * 100}%`, marginLeft: '-6px' }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-medium text-slate-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(currentSong.duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-8">
          <button onClick={onPrev} className="text-slate-400/60 hover:text-slate-200 active:scale-90 transition-all">
            <SkipBack size={24} />
          </button>
          <button 
            onClick={onPlayPause}
            className="w-12 h-12 bg-slate-300 text-slate-800 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all"
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} className="ml-0.5" fill="currentColor" />}
          </button>
          <button onClick={onNext} className="text-slate-400/60 hover:text-slate-200 active:scale-90 transition-all">
            <SkipForward size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LyricsDisplay;
