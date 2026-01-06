
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
  const Icon = ICON_MAP[playlist.iconType] || Heart;
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
      className="group relative transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full h-32 cursor-pointer select-none"
    >
      {/* Folder Tab - Behind */}
      <div className="absolute bg-gradient-to-b border-[1.094px] border-b-0 border-[rgba(69,85,108,0.5)] border-solid from-[rgba(69,85,108,0.8)] h-4 left-4 rounded-tl-[10px] rounded-tr-[10px] to-[rgba(49,65,88,0.8)] top-[-12px] w-16 group-hover:from-[rgba(69,85,108,0.9)] group-hover:to-[rgba(49,65,88,0.9)] transition-all duration-300 z-0" />
      
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 z-0"
        style={{ background: colorScheme.gradient }}
      />
      
      {/* Folder Body - In front */}
      <div 
        className="absolute border-[1.094px] border-[rgba(69,85,108,0.3)] border-solid h-full left-0 overflow-clip rounded-2xl top-0 w-full z-10 shadow-lg group-hover:shadow-2xl group-hover:border-[rgba(69,85,108,0.4)] transition-all duration-300"
        style={{ backgroundImage: colorScheme.gradient }}
      >
        {/* Decorative pattern overlay */}
        <div className="absolute h-full left-0 opacity-20 top-0 w-full pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id={`dots-${playlist.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" opacity="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#dots-${playlist.id})`} />
          </svg>
        </div>
        
        {/* Hold Progress Ring */}
        {isPressing && (
          <div className="absolute inset-0 z-30 pointer-events-none">
            <svg className="absolute top-4 left-4 w-12 h-12 -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="rgba(255, 255, 255, 0.4)"
                strokeWidth="2"
                strokeDasharray="125.6"
                strokeDashoffset={125.6 - (125.6 * holdProgress) / 100}
                strokeLinecap="round"
                className="transition-all duration-75"
              />
            </svg>
          </div>
        )}

        {/* Content Container */}
        <div className="absolute flex flex-col h-full items-start justify-between left-0 pb-4 pl-4 pr-4 pt-4 top-0 w-full z-20">
          {/* Icon Container */}
          <div className="bg-[rgba(255,255,255,0.8)] relative rounded-2xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 size-10 group-hover:bg-white group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
            <Icon className="w-5 h-5 text-slate-700" strokeWidth={2.5} />
          </div>
          
          {/* Text Info */}
          <div className="w-full">
            <h3 className="font-medium text-[#f1f5f9] text-sm truncate leading-tight tracking-tight">
              {playlist.name}
            </h3>
            <p className="font-normal text-xs text-[rgba(241,245,249,0.7)] mt-0.5 tracking-tight">
              {playlist.songCount} songs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistFolder;
