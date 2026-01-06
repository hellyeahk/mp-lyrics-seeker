
import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Song } from '../types';

interface MinimizedPlayerProps {
  currentSong: Song;
  isPlaying: boolean;
  onPlayPause: (e: React.MouseEvent) => void;
  onNext: (e: React.MouseEvent) => void;
  onPrev: (e: React.MouseEvent) => void;
  currentTime: number;
  onExpand: () => void;
}

const MinimizedPlayer: React.FC<MinimizedPlayerProps> = ({ 
  currentSong, 
  isPlaying, 
  onPlayPause, 
  onNext,
  onPrev,
  currentTime,
  onExpand
}) => {
  const progress = (currentTime / currentSong.duration) * 100;

  return (
    <div 
      onClick={onExpand}
      className="fixed bottom-[78px] left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-md bg-slate-800/70 backdrop-blur-xl border border-slate-700/40 rounded-2xl p-3 flex flex-col gap-2.5 shadow-2xl z-40 active:scale-[0.98] transition-all cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center shrink-0 shadow-lg overflow-hidden group">
            <div className={`w-6 h-6 rounded-full bg-slate-800/60 backdrop-blur-sm flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
              <div className="w-2 h-2 rounded-full bg-slate-900/80" />
            </div>
            {/* Mini Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-400/10 to-slate-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="min-w-0">
            <h4 className="text-[13px] font-semibold text-slate-100 truncate tracking-tight">{currentSong.title}</h4>
            <p className="text-[11px] text-slate-400 font-medium truncate opacity-80">{currentSong.artist}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={onPrev} className="p-1.5 text-slate-400/60 hover:text-slate-200">
            <SkipBack size={14} />
          </button>
          <button 
            onClick={onPlayPause}
            className="w-9 h-9 bg-slate-200 text-slate-800 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform"
          >
            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} className="ml-0.5" fill="currentColor" />}
          </button>
          <button onClick={onNext} className="p-1.5 text-slate-400/60 hover:text-slate-200">
            <SkipForward size={14} />
          </button>
        </div>
      </div>

      {/* Mini Progress Bar */}
      <div className="w-full h-0.5 bg-slate-700/50 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-slate-400 to-slate-200 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default MinimizedPlayer;
