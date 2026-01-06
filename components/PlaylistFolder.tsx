import React, { useState, useRef, useEffect } from 'react';
import { Heart, Moon, Coffee, Sun, TrendingUp, Headphones, Cloud, Clock } from 'lucide-react';
import { Playlist } from '../types';
import { FOLDER_COLORS } from '../constants';

interface PlaylistFolderProps {
  playlist: Playlist;
  onClick: () => void;
  onLongPress: () => void;
}

const ICON_MAP = {
  Heart,
  Moon,
  Coffee,
  Sun,
  TrendingUp,
  Headphones,
  Cloud,
  Clock,
};

const PlaylistFolder: React.FC<PlaylistFolderProps> = ({ playlist, onClick, onLongPress }) => {
  const Icon = ICON_MAP[playlist.iconType];
  const colorScheme = FOLDER_COLORS[playlist.color];
  
  const [isPressing, setIsPressing] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const timerRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const longPressThreshold = 800; // ms

  const startPress = () => {
    setIsPressing(true);
    setHoldProgress(0);
    
    const startTime = Date.now();
    progressIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / longPressThreshold) * 100, 100);
      setHoldProgress(newProgress);
      
      if (elapsed >= longPressThreshold) {
        clearInterval(progressIntervalRef.current!);
        onLongPress();
        cancelPress();
      }
    }, 16);

    timerRef.current = window.setTimeout(() => {
      // Long press handled by interval check above
    }, longPressThreshold);
  };

  const cancelPress = () => {
    setIsPressing(false);
    setHoldProgress(0);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  };

  const handlePointerUp = () => {
    if (isPressing && holdProgress < 90) {
      onClick();
    }
    cancelPress();
  };

  useEffect(() => {
    return () => cancelPress();
  }, []);

  return (
    <div 
      onPointerDown={startPress}
      onPointerUp={handlePointerUp}
      onPointerLeave={cancelPress}
      className={`group relative cursor-pointer w-full h-[140px] select-none transition-all duration-300 ${isPressing ? 'scale-[0.97]' : 'active:scale-95'}`}
    >
      {/* Glow Effect (Behind) */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colorScheme.from} ${colorScheme.to} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

      {/* Folder Tab (Behind Body) */}
      <div className="absolute -top-[10px] left-4 w-16 h-4 rounded-t-[10px] bg-slate-700/60 border border-slate-600/20 border-b-0 z-0 transition-colors" />

      {/* Folder Body (Front) */}
      <div className={`relative h-32 w-full bg-gradient-to-br ${colorScheme.from} ${colorScheme.to} rounded-2xl border border-slate-700/30 backdrop-blur-md shadow-lg group-hover:shadow-2xl transition-all duration-300 z-10 overflow-hidden`}>
        {/* Dot Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" 
             style={{ backgroundImage: `radial-gradient(circle, #fff 1.5px, transparent 1.5px)`, backgroundSize: '16px 16px' }} />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-4 z-20">
          <div className="relative w-9 h-9 shrink-0">
            {/* Hold Progress Ring */}
            {isPressing && (
              <svg className="absolute -inset-1 w-11 h-11 -rotate-90 pointer-events-none">
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  fill="none"
                  stroke="rgba(239, 68, 68, 0.4)"
                  strokeWidth="3"
                  strokeDasharray="113.1"
                  strokeDashoffset={113.1 - (113.1 * holdProgress) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-75"
                />
              </svg>
            )}
            
            <div className="w-9 h-9 flex items-center justify-center bg-white/70 rounded-xl shadow-sm group-hover:bg-white/90 group-hover:scale-105 transition-all duration-300">
              <Icon size={18} className="text-slate-800/80" strokeWidth={2.5} />
            </div>
          </div>

          <div className="space-y-0.5">
            <h3 className="text-slate-100 text-[13px] font-semibold truncate leading-tight tracking-tight">
              {playlist.name}
            </h3>
            <p className="text-slate-400/70 text-[10px] font-bold uppercase tracking-wider">
              {playlist.songCount} songs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistFolder;
