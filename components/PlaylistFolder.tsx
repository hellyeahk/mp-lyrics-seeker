
import React from 'react';
import { Heart, Moon, Coffee, Sun, TrendingUp, Headphones, Cloud, Clock } from 'lucide-react';
import { Playlist } from '../types';
import { FOLDER_COLORS } from '../constants';

interface PlaylistFolderProps {
  playlist: Playlist;
  onClick: () => void;
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

const PlaylistFolder: React.FC<PlaylistFolderProps> = ({ playlist, onClick }) => {
  const Icon = ICON_MAP[playlist.iconType] || Heart;
  const colorScheme = FOLDER_COLORS[playlist.color];

  return (
    <div 
      onClick={onClick}
      className="group relative transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full h-32 cursor-pointer select-none"
    >
      {/* Folder Tab - Behind (z-0) */}
      <div 
        className="absolute bg-gradient-to-b border-[1.094px] border-b-0 border-[rgba(69,85,108,0.5)] border-solid from-[rgba(69,85,108,0.8)] h-4 left-4 rounded-tl-[10px] rounded-tr-[10px] to-[rgba(49,65,88,0.8)] top-[-12px] w-16 group-hover:from-[rgba(69,85,108,0.9)] group-hover:to-[rgba(49,65,88,0.9)] transition-all duration-300 z-0" 
      />
      
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 z-0"
        style={{ background: colorScheme.gradient }}
      />
      
      {/* Folder Body - In front (z-10) */}
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
        
        {/* Content Container (z-20) */}
        <div className="absolute flex flex-col h-full items-start justify-between left-0 pb-0 pl-4 pr-0 pt-4 top-0 w-full z-20">
          {/* Icon Container */}
          <div className="bg-[rgba(255,255,255,0.8)] relative rounded-2xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 size-10 group-hover:bg-white group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
            <Icon className="w-5 h-5 text-slate-700 group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
          </div>
          
          {/* Text Info */}
          <div className="h-10 relative shrink-0 w-[calc(100%-1rem)] mb-4">
             <div className="flex flex-col gap-0.5 items-start relative size-full">
                <h3 className="font-['Inter',sans-serif] font-medium leading-5 text-[#f1f5f9] text-sm text-nowrap truncate max-w-full tracking-tight">
                  {playlist.name}
                </h3>
                <p className="font-['Inter',sans-serif] font-normal leading-4 text-xs text-[rgba(241,245,249,0.7)] tracking-tight">
                  {playlist.songCount} songs
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistFolder;
