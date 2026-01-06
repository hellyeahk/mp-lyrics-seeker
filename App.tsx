
import React, { useState, useEffect, useMemo } from 'react';
import { Search, ArrowLeft, Play, MoreVertical, Trash2, Plus, Music2, Heart, Moon, Coffee, Sun, TrendingUp, Headphones, Cloud, Clock, Edit3 } from 'lucide-react';
import { View, Playlist, Song, Toast as ToastType, FolderColor } from './types';
import { MOCK_PLAYLISTS, FOLDER_COLORS } from './constants';
import FlowerDecoration from './components/FlowerDecoration';
import NavigationBar from './components/NavigationBar';
import PlaylistFolder from './components/PlaylistFolder';
import MinimizedPlayer from './components/MinimizedPlayer';
import LyricsDisplay from './components/LyricsDisplay';
import Toast from './components/Toast';
import Modal from './components/Modal';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.PLAYLISTS);
  const [playlists, setPlaylists] = useState<Playlist[]>(MOCK_PLAYLISTS);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [currentSong, setCurrentSong] = useState<Song>(MOCK_PLAYLISTS[0].songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);
  
  // UI States
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const [editingPlaylistId, setEditingPlaylistId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<{ isOpen: boolean, songId: string } | null>(null);
  const [isDeletePlaylistModalOpen, setIsDeletePlaylistModalOpen] = useState(false);
  
  // Form States for Playlist (Create/Edit)
  const [playlistName, setPlaylistName] = useState('');
  const [playlistColor, setPlaylistColor] = useState<FolderColor>('Pink');
  const [playlistIcon, setPlaylistIcon] = useState<Playlist['iconType']>('Heart');

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setCurrentTime(prev => (prev < currentSong.duration ? prev + 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSong]);

  const addToast = (message: string, type: ToastType['type'] = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

  const handlePlaySong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setCurrentTime(0);
  };

  const handleNext = () => {
    const list = selectedPlaylist?.songs || MOCK_PLAYLISTS[0].songs;
    const index = list.findIndex(s => s.id === currentSong.id);
    handlePlaySong(list[(index + 1) % list.length]);
  };

  const handlePrev = () => {
    const list = selectedPlaylist?.songs || MOCK_PLAYLISTS[0].songs;
    const index = list.findIndex(s => s.id === currentSong.id);
    handlePlaySong(list[(index - 1 + list.length) % list.length]);
  };

  const openCreateModal = () => {
    setEditingPlaylistId(null);
    setPlaylistName('');
    setPlaylistColor('Pink');
    setPlaylistIcon('Heart');
    setIsPlaylistModalOpen(true);
  };

  const openEditModal = (playlist: Playlist) => {
    setEditingPlaylistId(playlist.id);
    setPlaylistName(playlist.name);
    setPlaylistColor(playlist.color);
    setPlaylistIcon(playlist.iconType);
    setIsPlaylistModalOpen(true);
    setIsHeaderMenuOpen(false);
  };

  const handleSavePlaylist = () => {
    if (!playlistName.trim()) {
      addToast('Please enter a playlist name', 'error');
      return;
    }

    if (editingPlaylistId) {
      setPlaylists(prev => prev.map(p => 
        p.id === editingPlaylistId 
          ? { ...p, name: playlistName, color: playlistColor, iconType: playlistIcon } 
          : p
      ));
      if (selectedPlaylist?.id === editingPlaylistId) {
        setSelectedPlaylist(prev => prev ? { ...prev, name: playlistName, color: playlistColor, iconType: playlistIcon } : null);
      }
      addToast('Playlist updated successfully!');
    } else {
      const newList: Playlist = {
        id: Math.random().toString(),
        name: playlistName,
        songCount: 0,
        iconType: playlistIcon,
        color: playlistColor,
        songs: []
      };
      setPlaylists(prev => [...prev, newList]);
      addToast('Playlist created successfully!');
    }
    
    setIsPlaylistModalOpen(false);
  };

  const handleRemoveSong = () => {
    if (selectedPlaylist && isDeleteModalOpen) {
      const updatedSongs = selectedPlaylist.songs.filter(s => s.id !== isDeleteModalOpen.songId);
      const updatedPlaylist = { ...selectedPlaylist, songs: updatedSongs, songCount: updatedSongs.length };
      setPlaylists(prev => prev.map(p => p.id === selectedPlaylist.id ? updatedPlaylist : p));
      setSelectedPlaylist(updatedPlaylist);
      addToast('Song removed from playlist');
      setIsDeleteModalOpen(null);
    }
  };

  const handleDeletePlaylist = () => {
    if (selectedPlaylist) {
      setPlaylists(prev => prev.filter(p => p.id !== selectedPlaylist.id));
      addToast(`Playlist "${selectedPlaylist.name}" deleted`);
      setCurrentView(View.PLAYLISTS);
      setSelectedPlaylist(null);
      setIsDeletePlaylistModalOpen(false);
      setIsHeaderMenuOpen(false);
    }
  };

  const filteredSongs = useMemo(() => {
    if (!selectedPlaylist) return [];
    return selectedPlaylist.songs.filter(s => 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedPlaylist, searchQuery]);

  const ModalIconMap = { Heart, Moon, Coffee, Sun, TrendingUp, Headphones, Cloud, Clock };

  return (
    <div className="relative min-h-screen pb-36">
      <FlowerDecoration />
      
      {/* Toast Manager */}
      <div className="fixed bottom-0 left-0 w-full z-[70] pointer-events-none">
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} onClose={removeToast} />
        ))}
      </div>

      <main className="relative z-10 pt-10 px-5">
        
        {/* Playlists Grid */}
        {currentView === View.PLAYLISTS && (
          <div className="max-w-md mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <header className="space-y-1 mb-8">
              <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Your Playlists</h1>
              <p className="text-slate-400/70 text-sm font-medium">{playlists.length} playlists • {playlists.reduce((a, b) => a + b.songCount, 0)} songs total</p>
            </header>

            <div className="grid grid-cols-2 gap-x-4 gap-y-10">
              {playlists.map((playlist) => (
                <PlaylistFolder 
                  key={playlist.id} 
                  playlist={playlist} 
                  onClick={() => {
                    setSelectedPlaylist(playlist);
                    setCurrentView(View.PLAYLIST_DETAIL);
                  }}
                  onLongPress={() => {
                    setSelectedPlaylist(playlist);
                    setIsDeletePlaylistModalOpen(true);
                  }}
                />
              ))}
              
              {/* Create New Folder Card */}
              <button
                onClick={openCreateModal}
                className="group relative transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full h-32"
              >
                {/* Folder Tab - Behind */}
                <div className="absolute bg-gradient-to-b border-[1.094px] border-b-0 border-[rgba(69,85,108,0.5)] border-solid from-[rgba(69,85,108,0.8)] h-4 left-4 rounded-tl-[10px] rounded-tr-[10px] to-[rgba(49,65,88,0.8)] top-[-12px] w-16 group-hover:from-[rgba(69,85,108,0.9)] group-hover:to-[rgba(49,65,88,0.9)] transition-all duration-300 z-0" />
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 z-0 bg-gradient-to-br from-slate-400/30 to-slate-500/30" />
                
                {/* Folder Body - In front */}
                <div className="absolute border-[1.094px] border-[rgba(69,85,108,0.3)] border-dashed border-solid h-full left-0 overflow-clip rounded-2xl top-0 w-full z-10 shadow-lg group-hover:shadow-2xl group-hover:border-[rgba(69,85,108,0.5)] transition-all duration-300 bg-slate-800/20 backdrop-blur-sm">
                  <div className="absolute content-stretch flex flex-col h-full items-center justify-center left-0 top-0 w-full gap-2">
                    <div className="bg-[rgba(255,255,255,0.1)] relative rounded-2xl shrink-0 size-12 group-hover:bg-[rgba(255,255,255,0.15)] group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
                      <Plus className="w-6 h-6 text-slate-300 group-hover:text-slate-100 transition-colors duration-300" strokeWidth={2.5} />
                    </div>
                    <p className="font-medium text-slate-300 group-hover:text-slate-100 text-sm transition-colors duration-300">
                      New Playlist
                    </p>
                  </div>
                </div>
              </button>
            </div>

            <footer className="pt-8 text-center text-slate-500/60 text-[10px] tracking-widest uppercase font-medium">
              crafted with ♡ by @wooykung
            </footer>
          </div>
        )}

        {/* Playlist Detail */}
        {currentView === View.PLAYLIST_DETAIL && selectedPlaylist && (
          <div className="max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
            <button 
              onClick={() => { setCurrentView(View.PLAYLISTS); setIsHeaderMenuOpen(false); }}
              className="group flex items-center gap-2 text-slate-400 hover:text-slate-200"
            >
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              <span className="text-sm font-medium">Back to Playlists</span>
            </button>

            {/* Header Card */}
            <div className="relative p-6 rounded-[32px] border border-white/5 shadow-2xl space-y-4">
               {/* Background Layer with Overflow Hidden */}
               <div 
                 className="absolute inset-0 rounded-[32px] overflow-hidden backdrop-blur-xl z-0" 
                 style={{ background: FOLDER_COLORS[selectedPlaylist.color].gradient }}
               >
                 <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                      style={{ backgroundImage: `radial-gradient(circle, #fff 1.5px, transparent 1.5px)`, backgroundSize: '24px 24px' }} />
               </div>
               
               {/* Header Content - Use z-30 to ensure it's on top of Play All button */}
               <div className="relative flex justify-between items-start z-30">
                 <div className="space-y-1">
                   <h1 className="text-3xl font-bold text-white tracking-tighter leading-none">{selectedPlaylist.name}</h1>
                   <p className="text-white/70 text-sm font-bold uppercase tracking-widest">{selectedPlaylist.songCount} songs</p>
                 </div>
                 
                 {/* Header Dropdown Menu */}
                 <div className="relative">
                   <button 
                    onClick={() => setIsHeaderMenuOpen(!isHeaderMenuOpen)}
                    className="p-2 text-white/80 hover:text-white transition-colors bg-white/10 rounded-full active:scale-90"
                   >
                     <MoreVertical size={20} />
                   </button>
                   {isHeaderMenuOpen && (
                     <div className="absolute right-0 top-12 w-48 bg-slate-900/98 backdrop-blur-3xl border border-slate-700/50 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] py-2 z-[70] animate-in fade-in slide-in-from-top-2 duration-200">
                       <button 
                         onClick={() => openEditModal(selectedPlaylist)}
                         className="w-full flex items-center gap-3 px-4 py-3 text-xs text-slate-200 font-bold hover:bg-white/10 transition-colors"
                       >
                         <div className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                            <Edit3 size={14} />
                         </div>
                         Edit Playlist
                       </button>
                       <div className="h-px bg-slate-700/50 mx-2 my-1" />
                       <button 
                         onClick={() => setIsDeletePlaylistModalOpen(true)}
                         className="w-full flex items-center gap-3 px-4 py-3 text-xs text-red-400 font-bold hover:bg-red-500/10 transition-colors"
                       >
                         <div className="w-6 h-6 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400">
                            <Trash2 size={14} />
                         </div>
                         Delete Playlist
                       </button>
                     </div>
                   )}
                 </div>
               </div>
               
               {/* Play All Button - Uses z-10 */}
               <button className="relative z-10 flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-full font-bold shadow-lg transition-all active:scale-95">
                 <Play size={18} fill="currentColor" />
                 <span>Play All</span>
               </button>
            </div>

            <div className="relative">
               <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
               <input 
                 type="text"
                 placeholder="Search in this playlist..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full pl-11 pr-4 py-3 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl text-[15px] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-slate-600 transition-all"
               />
            </div>

            <div className="space-y-2">
              {filteredSongs.map((song, idx) => (
                <div 
                  key={song.id}
                  onClick={() => { handlePlaySong(song); setCurrentView(View.LYRICS); }}
                  className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-800/40 transition-all active:bg-slate-800/60"
                >
                  <div className="w-6 text-center">
                    <span className="text-xs font-bold text-slate-500 group-hover:hidden">{idx + 1}</span>
                    <Play size={14} fill="currentColor" className="hidden group-hover:block mx-auto text-slate-300" />
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${song.coverColor} shrink-0 shadow-md`} />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-slate-100 truncate tracking-tight">{song.title}</h4>
                    <p className="text-xs text-slate-500 font-semibold truncate tracking-tight">{song.artist}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-slate-500">3:24</span>
                    <div className="relative">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === song.id ? null : song.id); }}
                        className="p-2 text-slate-400 hover:text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical size={16} />
                      </button>
                      {openMenuId === song.id && (
                        <div className="absolute right-0 bottom-full mb-2 w-48 bg-slate-900/95 backdrop-blur-2xl border border-slate-700/50 rounded-xl shadow-2xl py-1 z-50 animate-in fade-in slide-in-from-bottom-2">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setIsDeleteModalOpen({ isOpen: true, songId: song.id }); setOpenMenuId(null); }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 font-semibold hover:bg-red-500/10"
                          >
                            <Trash2 size={14} /> Remove from playlist
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {filteredSongs.length === 0 && <div className="py-12 text-center text-slate-500 text-sm italic">No songs found</div>}
            </div>
          </div>
        )}

        {/* Lyrics Display */}
        {currentView === View.LYRICS && (
          <LyricsDisplay 
            currentSong={currentSong}
            currentTime={currentTime}
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onNext={handleNext}
            onPrev={handlePrev}
            onSeek={setCurrentTime}
            onLike={() => addToast(`Added "${currentSong.title}" to favorites`)}
          />
        )}
      </main>

      {/* Floating Minimized Player */}
      {currentView !== View.LYRICS && (
        <MinimizedPlayer 
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlayPause={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
          onNext={(e) => { e.stopPropagation(); handleNext(); }}
          onPrev={(e) => { e.stopPropagation(); handlePrev(); }}
          currentTime={currentTime}
          onExpand={() => setCurrentView(View.LYRICS)}
        />
      )}

      {/* Navigation */}
      <NavigationBar currentView={currentView} onNavigate={setCurrentView} />

      {/* Create / Edit Modal */}
      <Modal 
        isOpen={isPlaylistModalOpen} 
        onClose={() => setIsPlaylistModalOpen(false)} 
        title={editingPlaylistId ? "Edit Playlist" : "Create New Playlist"}
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Name</label>
            <input 
              type="text"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 rounded-xl border border-slate-700 focus:border-slate-500 focus:outline-none text-slate-100"
              placeholder="Vibes..."
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Choose Icon</label>
            <div className="grid grid-cols-4 gap-3">
              {(['Heart', 'Moon', 'Coffee', 'Sun', 'TrendingUp', 'Headphones', 'Cloud', 'Clock'] as Playlist['iconType'][]).map(icon => {
                const IconComp = ModalIconMap[icon];
                return (
                  <button 
                    key={icon}
                    onClick={() => setPlaylistIcon(icon)}
                    className={`h-12 flex items-center justify-center rounded-xl border transition-all ${playlistIcon === icon ? 'bg-slate-300 border-slate-300 text-slate-900' : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                  >
                    <IconComp size={18} />
                  </button>
                );
              })}
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Choose Color</label>
            <div className="grid grid-cols-4 gap-3">
              {(Object.keys(FOLDER_COLORS) as FolderColor[]).map(color => (
                <button 
                  key={color}
                  onClick={() => setPlaylistColor(color)}
                  className={`h-10 rounded-xl transition-all ${playlistColor === color ? 'ring-4 ring-slate-100 scale-110' : 'opacity-60 hover:opacity-100'}`}
                  style={{ background: FOLDER_COLORS[color].gradient }}
                />
              ))}
            </div>
          </div>
          <button 
            onClick={handleSavePlaylist}
            className="w-full py-4 bg-slate-300 text-slate-900 font-bold rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
          >
            {editingPlaylistId ? "Update Playlist" : "Create Playlist"}
          </button>
        </div>
      </Modal>

      {/* Delete Song Confirmation Modal */}
      <Modal 
        isOpen={!!isDeleteModalOpen?.isOpen} 
        onClose={() => setIsDeleteModalOpen(null)} 
        title="Remove from Playlist?"
      >
        <div className="space-y-6">
          <p className="text-slate-400 text-sm leading-relaxed">This will remove the song from <span className="text-slate-200 font-bold">{selectedPlaylist?.name}</span>. You can always add it back later.</p>
          <div className="flex flex-col gap-2">
            <button 
              onClick={handleRemoveSong}
              className="w-full py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors"
            >
              Remove Song
            </button>
            <button 
              onClick={() => setIsDeleteModalOpen(null)}
              className="w-full py-3 text-slate-400 font-bold hover:text-slate-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Playlist Confirmation Modal */}
      <Modal 
        isOpen={isDeletePlaylistModalOpen} 
        onClose={() => setIsDeletePlaylistModalOpen(false)} 
        title="Delete Playlist?"
      >
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
            <p className="text-slate-300 text-sm leading-relaxed">
              Are you sure you want to delete <span className="text-white font-bold">"{selectedPlaylist?.name}"</span>? 
              This action cannot be undone and all your saved progress in this playlist will be lost.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <button 
              onClick={handleDeletePlaylist}
              className="w-full py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all active:scale-95"
            >
              Delete Playlist
            </button>
            <button 
              onClick={() => setIsDeletePlaylistModalOpen(false)}
              className="w-full py-3 text-slate-400 font-bold hover:text-slate-200 transition-colors"
            >
              Keep Playlist
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;
