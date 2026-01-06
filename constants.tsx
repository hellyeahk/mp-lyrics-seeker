
import { Playlist, Song, FolderColor } from './types';

export const FOLDER_COLORS: Record<FolderColor, { from: string, to: string, glow: string, gradient: string }> = {
  Pink: { 
    from: 'from-pink-400/30', 
    to: 'to-rose-300/30', 
    glow: 'rgba(244, 114, 182, 0.3)',
    gradient: 'linear-gradient(144.31deg, rgba(244, 114, 182, 0.5) 0%, rgba(253, 164, 175, 0.5) 100%)'
  },
  Blue: { 
    from: 'from-blue-400/30', 
    to: 'to-cyan-300/30', 
    glow: 'rgba(96, 165, 250, 0.3)',
    gradient: 'linear-gradient(144.31deg, rgba(96, 165, 250, 0.5) 0%, rgba(103, 232, 249, 0.5) 100%)'
  },
  Purple: { 
    from: 'from-purple-400/30', 
    to: 'to-indigo-300/30', 
    glow: 'rgba(192, 132, 252, 0.3)',
    gradient: 'linear-gradient(144.31deg, rgba(192, 132, 252, 0.5) 0%, rgba(165, 180, 252, 0.5) 100%)'
  },
  Amber: { 
    from: 'from-amber-400/30', 
    to: 'to-yellow-300/30', 
    glow: 'rgba(251, 191, 36, 0.3)',
    gradient: 'linear-gradient(144.31deg, rgba(251, 191, 36, 0.5) 0%, rgba(253, 224, 71, 0.5) 100%)'
  },
  Red: { 
    from: 'from-red-400/30', 
    to: 'to-orange-300/30', 
    glow: 'rgba(248, 113, 113, 0.3)',
    gradient: 'linear-gradient(144.31deg, rgba(248, 113, 113, 0.5) 0%, rgba(253, 186, 116, 0.5) 100%)'
  },
  Teal: { 
    from: 'from-teal-400/30', 
    to: 'to-emerald-300/30', 
    glow: 'rgba(45, 212, 191, 0.3)',
    gradient: 'linear-gradient(144.31deg, rgba(45, 212, 191, 0.5) 0%, rgba(110, 231, 183, 0.5) 100%)'
  },
  Violet: { 
    from: 'from-violet-400/30', 
    to: 'to-purple-300/30', 
    glow: 'rgba(167, 139, 250, 0.3)',
    gradient: 'linear-gradient(144.31deg, rgba(167, 139, 250, 0.5) 0%, rgba(216, 180, 254, 0.5) 100%)'
  },
  Slate: { 
    from: 'from-slate-400/30', 
    to: 'to-gray-300/30', 
    glow: 'rgba(148, 163, 184, 0.3)',
    gradient: 'linear-gradient(144.31deg, rgba(148, 163, 184, 0.5) 0%, rgba(209, 213, 219, 0.5) 100%)'
  },
};

export const MOCK_LYRICS = [
  { time: 0, text: "Walking down the street" },
  { time: 4, text: "Thinking of the ways we meet" },
  { time: 8, text: "And the sky turns into gold" },
  { time: 12, text: "Like a story once was told" },
  { time: 16, text: "I can feel the rhythm slow" },
  { time: 20, text: "Watching as the flowers grow" },
  { time: 24, text: "Every beat is like a drum" },
  { time: 28, text: "Waiting for the day to come" },
  { time: 32, text: "In the whispers of the wind" },
  { time: 36, text: "Where the memories begin" },
  { time: 40, text: "Can you hear the melody?" },
  { time: 44, text: "Singing songs for you and me" },
];

const MOCK_SONGS: Song[] = [
  { id: '1', title: 'Golden Hour', artist: 'JVKE', duration: 204, coverColor: 'bg-amber-400', lyrics: MOCK_LYRICS },
  { id: '2', title: 'Midnight City', artist: 'M83', duration: 243, coverColor: 'bg-blue-600', lyrics: MOCK_LYRICS },
  { id: '3', title: 'Blinding Lights', artist: 'The Weeknd', duration: 200, coverColor: 'bg-red-500', lyrics: MOCK_LYRICS },
  { id: '4', title: 'Ocean Eyes', artist: 'Billie Eilish', duration: 200, coverColor: 'bg-cyan-400', lyrics: MOCK_LYRICS },
  { id: '5', title: 'Starboy', artist: 'The Weeknd', duration: 230, coverColor: 'bg-purple-600', lyrics: MOCK_LYRICS },
];

export const MOCK_PLAYLISTS: Playlist[] = [
  { id: 'p1', name: 'Chill Vibes', songCount: 12, iconType: 'Coffee', color: 'Amber', songs: MOCK_SONGS },
  { id: 'p2', name: 'Evening Stars', songCount: 8, iconType: 'Moon', color: 'Blue', songs: MOCK_SONGS.slice(0, 3) },
  { id: 'p3', name: 'Summer Hits', songCount: 24, iconType: 'Sun', color: 'Red', songs: MOCK_SONGS },
  { id: 'p4', name: 'Coding Flow', songCount: 15, iconType: 'Headphones', color: 'Purple', songs: MOCK_SONGS },
  { id: 'p5', name: 'Daily Mix', songCount: 30, iconType: 'Clock', color: 'Slate', songs: MOCK_SONGS },
  { id: 'p6', name: 'Favorites', songCount: 42, iconType: 'Heart', color: 'Pink', songs: MOCK_SONGS },
  { id: 'p7', name: 'On the Go', songCount: 10, iconType: 'TrendingUp', color: 'Teal', songs: MOCK_SONGS },
  { id: 'p8', name: 'Cloudy Days', songCount: 19, iconType: 'Cloud', color: 'Violet', songs: MOCK_SONGS },
];
