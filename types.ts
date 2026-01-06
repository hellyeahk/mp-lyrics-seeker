
export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number; // in seconds
  coverColor: string;
  lyrics: LyricLine[];
}

export interface LyricLine {
  time: number; // in seconds
  text: string;
}

export interface Playlist {
  id: string;
  name: string;
  songCount: number;
  iconType: 'Heart' | 'Moon' | 'Coffee' | 'Sun' | 'TrendingUp' | 'Headphones' | 'Cloud' | 'Clock';
  color: FolderColor;
  songs: Song[];
}

export type FolderColor = 'Pink' | 'Blue' | 'Purple' | 'Amber' | 'Red' | 'Teal' | 'Violet' | 'Slate';

export enum View {
  PLAYLISTS = 'playlists',
  LYRICS = 'lyrics',
  PLAYLIST_DETAIL = 'playlist_detail'
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
