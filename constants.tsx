import { Playlist, Song, FolderColor } from './types';

export const FOLDER_COLORS: Record<FolderColor, { from: string, to: string, glow: string }> = {
  Pink: { from: 'from-rose-500/40', to: 'to-pink-600/30', glow: 'shadow-pink-500/10' },
  Blue: { from: 'from-blue-500/40', to: 'to-cyan-600/30', glow: 'shadow-blue-500/10' },
  Purple: { from: 'from-purple-500/40', to: 'to-indigo-600/30', glow: 'shadow-purple-500/10' },
  Amber: { from: 'from-amber-500/40', to: 'to-yellow-600/30', glow: 'shadow-amber-500/10' },
  Red: { from: 'from-red-500/40', to: 'to-orange-600/30', glow: 'shadow-red-500/10' },
  Teal: { from: 'from-teal-500/40', to: 'to-emerald-600/30', glow: 'shadow-teal-500/10' },
  Violet: { from: 'from-violet-500/40', to: 'to-purple-600/30', glow: 'shadow-violet-500/10' },
  Slate: { from: 'from-slate-500/40', to: 'to-gray-600/30', glow: 'shadow-slate-500/10' },
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
