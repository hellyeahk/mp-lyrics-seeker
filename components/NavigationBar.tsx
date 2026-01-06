import React from 'react';
import { List, Music2 } from 'lucide-react';
import { View } from '../types';

interface NavigationBarProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ currentView, onNavigate }) => {
  const isPlaylistsActive = currentView === View.PLAYLISTS || currentView === View.PLAYLIST_DETAIL;
  const isLyricsActive = currentView === View.LYRICS;

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-1.5 py-1.5 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-full shadow-xl flex items-center gap-1.5">
      <button
        onClick={() => onNavigate(View.PLAYLISTS)}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 ${
          isPlaylistsActive
            ? 'bg-slate-200 text-slate-800 shadow-md'
            : 'text-slate-400 hover:text-slate-300'
        }`}
      >
        <List size={16} strokeWidth={2.5} />
        <span className="text-xs font-bold tracking-tight">Playlists</span>
      </button>
      <button
        onClick={() => onNavigate(View.LYRICS)}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 ${
          isLyricsActive
            ? 'bg-slate-200 text-slate-800 shadow-md'
            : 'text-slate-400 hover:text-slate-300'
        }`}
      >
        <Music2 size={16} strokeWidth={2.5} />
        <span className="text-xs font-bold tracking-tight">Lyrics</span>
      </button>
    </nav>
  );
};

export default NavigationBar;
