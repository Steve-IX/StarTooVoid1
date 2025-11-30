'use client';

import React, { createContext, useContext, useState, useRef, useEffect, useCallback, ReactNode } from 'react';
import { Track, getAllTracks, addTrack, deleteTrack, extractMetadata, getTrackFile, forceDeleteTrack } from '@/lib/indexedDB';

interface MusicPlayerState {
  playlist: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  hasUserInteracted: boolean;
  currentTime: number;
  duration: number;
  isMuted: boolean;
  isMinimized: boolean;
  volume: number;
  isShuffled: boolean;
  showPlaylist: boolean;
  activeBlobUrl: string | null;
}

interface MusicPlayerContextType extends MusicPlayerState {
  audioRef: React.RefObject<HTMLAudioElement>;
  setCurrentTrackIndex: (index: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setIsMuted: (muted: boolean) => void;
  setIsMinimized: (minimized: boolean) => void;
  setVolume: (volume: number) => void;
  setIsShuffled: (shuffled: boolean) => void;
  setShowPlaylist: (show: boolean) => void;
  playTrack: (index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  togglePlayPause: () => void;
  toggleShuffle: () => void;
  toggleMute: () => void;
  addTracks: (files: File[]) => Promise<void>;
  removeTrack: (trackId: string) => Promise<void>;
  seekTo: (time: number) => void;
  loadTracks: () => Promise<void>;
  initializeDefaultTracks: () => Promise<void>;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CURRENT_INDEX: 'musicPlayer_currentIndex',
  VOLUME: 'musicPlayer_volume',
  IS_MUTED: 'musicPlayer_isMuted',
  IS_SHUFFLED: 'musicPlayer_isShuffled',
  IS_MINIMIZED: 'musicPlayer_isMinimized',
  SHOW_PLAYLIST: 'musicPlayer_showPlaylist',
};

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const pendingPlayRef = useRef(false);
  const [state, setState] = useState<MusicPlayerState>({
    playlist: [],
    currentTrackIndex: -1,
    isPlaying: false,
    hasUserInteracted: false,
    currentTime: 0,
    duration: 0,
    isMuted: false,
    volume: 0.7,
    isMinimized: true,
    isShuffled: false,
    showPlaylist: false,
    activeBlobUrl: null,
  });

  // Load state from localStorage
  useEffect(() => {
    try {
      const savedVolume = localStorage.getItem(STORAGE_KEYS.VOLUME);
      const savedIsMuted = localStorage.getItem(STORAGE_KEYS.IS_MUTED);
      const savedIsShuffled = localStorage.getItem(STORAGE_KEYS.IS_SHUFFLED);
      const savedIsMinimized = localStorage.getItem(STORAGE_KEYS.IS_MINIMIZED);
      const savedShowPlaylist = localStorage.getItem(STORAGE_KEYS.SHOW_PLAYLIST);

      if (savedVolume) setState(prev => ({ ...prev, volume: parseFloat(savedVolume) }));
      if (savedIsMuted) setState(prev => ({ ...prev, isMuted: savedIsMuted === 'true' }));
      if (savedIsShuffled) setState(prev => ({ ...prev, isShuffled: savedIsShuffled === 'true' }));
      
      const hasExplicitlyChanged = localStorage.getItem('musicPlayer_hasExplicitlyChanged');
      if (hasExplicitlyChanged && savedIsMinimized) {
        setState(prev => ({ ...prev, isMinimized: savedIsMinimized === 'true' }));
      }
      if (savedShowPlaylist) setState(prev => ({ ...prev, showPlaylist: savedShowPlaylist === 'true' }));
    } catch (error) {
      console.error('Error loading state from localStorage:', error);
    }
  }, []);

  // Load tracks from IndexedDB
  const loadTracks = useCallback(async () => {
    try {
      const tracks = await getAllTracks();
      setState(prev => {
        const newState = { ...prev, playlist: tracks };
        
        // Auto-select first track if none selected and tracks exist
        if (prev.currentTrackIndex < 0 && tracks.length > 0) {
          const savedIndex = localStorage.getItem(STORAGE_KEYS.CURRENT_INDEX);
          if (savedIndex) {
            const index = parseInt(savedIndex, 10);
            if (index >= 0 && index < tracks.length) {
              newState.currentTrackIndex = index;
            } else {
              newState.currentTrackIndex = 0;
            }
          } else {
            newState.currentTrackIndex = 0;
          }
        }
        
        // Adjust index if out of bounds
        if (prev.currentTrackIndex >= tracks.length && tracks.length > 0) {
          newState.currentTrackIndex = tracks.length - 1;
        }
        
        return newState;
      });
    } catch (error) {
      console.error('Error loading tracks:', error);
    }
  }, []);

  // Initialize default tracks
  const initializeDefaultTracks = useCallback(async () => {
    try {
      const existingTracks = await getAllTracks();
      const existingDefaultTrack = existingTracks.find(track => track.isDefault && track.filename === 'sun.mp3');
      
      // If track exists but has no cover art, delete and recreate it
      if (existingDefaultTrack && !existingDefaultTrack.coverArt) {
        console.log('Default track exists without cover art, refreshing...');
        await forceDeleteTrack(existingDefaultTrack.id);
        // Continue to create new track with cover art
      } else if (existingDefaultTrack) {
        return; // Track exists with cover art, nothing to do
      }

      // Create new default track with cover art extraction
      let coverArt: string | undefined;
      let title = 'Sun';
      let artist = 'StarTooVoid';
      let album = 'StarTooVoid Collection';
      
      try {
        const response = await fetch('/music/sun.mp3');
        if (response.ok) {
          const blob = await response.blob();
          const file = new File([blob], 'sun.mp3', { type: 'audio/mpeg' });
          const metadata = await extractMetadata(file);
          
          if (metadata.coverArt) coverArt = metadata.coverArt;
          if (metadata.title) title = metadata.title;
          if (metadata.artist && metadata.artist !== 'Unknown Artist') artist = metadata.artist;
          if (metadata.album && metadata.album !== 'Unknown Album') album = metadata.album;
        }
      } catch (error) {
        console.warn('Could not extract metadata from sun.mp3:', error);
      }

      // Use brand logo as fallback cover art if no embedded art found
      if (!coverArt) {
        try {
          const logoResponse = await fetch('/images/555062606_17941033638067378_6884414366850346687_n.jpg');
          if (logoResponse.ok) {
            const logoBlob = await logoResponse.blob();
            const reader = new FileReader();
            coverArt = await new Promise<string>((resolve) => {
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(logoBlob);
            });
          }
        } catch (error) {
          console.warn('Could not load fallback cover art:', error);
        }
      }

      const defaultTrack: Track = {
        id: 'default-sun',
        title,
        artist,
        album,
        filename: 'sun.mp3',
        isDefault: true,
        isLocal: false,
        coverArt,
      };

      await addTrack(defaultTrack);
      await loadTracks();
    } catch (error) {
      console.error('Error initializing default tracks:', error);
    }
  }, [loadTracks]);

  // Initialize on mount
  useEffect(() => {
    const init = async () => {
      await initializeDefaultTracks();
      await loadTracks();
    };
    init();
  }, [initializeDefaultTracks, loadTracks]);

  // Save state to localStorage
  useEffect(() => {
    try {
      if (state.currentTrackIndex >= 0) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_INDEX, state.currentTrackIndex.toString());
      }
      localStorage.setItem(STORAGE_KEYS.VOLUME, state.volume.toString());
      localStorage.setItem(STORAGE_KEYS.IS_MUTED, state.isMuted.toString());
      localStorage.setItem(STORAGE_KEYS.IS_SHUFFLED, state.isShuffled.toString());
      localStorage.setItem(STORAGE_KEYS.IS_MINIMIZED, state.isMinimized.toString());
      localStorage.setItem(STORAGE_KEYS.SHOW_PLAYLIST, state.showPlaylist.toString());
    } catch (error) {
      console.error('Error saving state to localStorage:', error);
    }
  }, [state.currentTrackIndex, state.volume, state.isMuted, state.isShuffled, state.isMinimized, state.showPlaylist]);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setState(prev => ({ ...prev, currentTime: audio.currentTime }));
    };

    const handleDurationChange = () => {
      setState(prev => ({ ...prev, duration: audio.duration || 0 }));
    };

    const handleEnded = () => {
      // Auto-play next track
      setState(prev => {
        if (prev.playlist.length === 0) return prev;
        
        let nextIndex: number;
        if (prev.isShuffled) {
          nextIndex = Math.floor(Math.random() * prev.playlist.length);
        } else {
          nextIndex = (prev.currentTrackIndex + 1) % prev.playlist.length;
        }
        
        return { ...prev, currentTrackIndex: nextIndex };
      });
      pendingPlayRef.current = true;
    };

    const handlePlay = () => {
      setState(prev => ({ ...prev, isPlaying: true, hasUserInteracted: true }));
    };

    const handlePause = () => {
      setState(prev => ({ ...prev, isPlaying: false }));
    };

    const handleCanPlay = () => {
      if (pendingPlayRef.current) {
        audio.play().catch(console.error);
        pendingPlayRef.current = false;
      }
    };

    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      setState(prev => ({ ...prev, isPlaying: false }));
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // Update audio volume
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = state.isMuted ? 0 : state.volume;
  }, [state.volume, state.isMuted]);

  // Load track source when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || state.currentTrackIndex < 0 || state.playlist.length === 0) return;

    const track = state.playlist[state.currentTrackIndex];
    if (!track) return;

    const loadTrack = async () => {
      // Cleanup previous blob URL
      if (state.activeBlobUrl) {
        URL.revokeObjectURL(state.activeBlobUrl);
      }

      const wasPlaying = state.isPlaying;
      
      if (track.isLocal && track.id) {
        try {
          const blob = await getTrackFile(track.id);
          if (blob) {
            const blobUrl = URL.createObjectURL(blob);
            audio.src = blobUrl;
            setState(prev => ({ ...prev, activeBlobUrl: blobUrl }));
          }
        } catch (error) {
          console.error('Error loading track file:', error);
          return;
        }
      } else {
        audio.src = `/music/${track.filename}`;
        setState(prev => ({ ...prev, activeBlobUrl: null }));
      }

      audio.load();
      
      // Resume playback if was playing
      if (wasPlaying || pendingPlayRef.current) {
        pendingPlayRef.current = true;
      }
    };

    loadTrack();
  }, [state.currentTrackIndex, state.playlist.length]);

  const playTrack = useCallback((index: number) => {
    setState(prev => {
      if (index >= 0 && index < prev.playlist.length) {
        pendingPlayRef.current = true;
        return { ...prev, currentTrackIndex: index, hasUserInteracted: true };
      }
      return prev;
    });
  }, []);

  const playNext = useCallback(() => {
    setState(prev => {
      if (prev.playlist.length === 0) return prev;
      
      let nextIndex: number;
      if (prev.isShuffled) {
        nextIndex = Math.floor(Math.random() * prev.playlist.length);
      } else {
        nextIndex = (prev.currentTrackIndex + 1) % prev.playlist.length;
      }
      
      pendingPlayRef.current = prev.isPlaying;
      return { ...prev, currentTrackIndex: nextIndex };
    });
  }, []);

  const playPrevious = useCallback(() => {
    setState(prev => {
      if (prev.playlist.length === 0) return prev;
      
      let prevIndex: number;
      if (prev.isShuffled) {
        prevIndex = Math.floor(Math.random() * prev.playlist.length);
      } else {
        prevIndex = prev.currentTrackIndex <= 0 
          ? prev.playlist.length - 1 
          : prev.currentTrackIndex - 1;
      }
      
      pendingPlayRef.current = prev.isPlaying;
      return { ...prev, currentTrackIndex: prevIndex };
    });
  }, []);

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (state.isPlaying) {
      audio.pause();
    } else {
      setState(prev => ({ ...prev, hasUserInteracted: true }));
      audio.play().catch(console.error);
    }
  }, [state.isPlaying]);

  const toggleShuffle = useCallback(() => {
    setState(prev => ({ ...prev, isShuffled: !prev.isShuffled }));
  }, []);

  const toggleMute = useCallback(() => {
    setState(prev => ({ ...prev, isMuted: !prev.isMuted }));
  }, []);

  const addTracks = useCallback(async (files: File[]) => {
    const wasPlaying = state.isPlaying;
    const currentIdx = state.currentTrackIndex;
    
    try {
      for (const file of files) {
        if (!file.type.startsWith('audio/')) continue;

        const metadata = await extractMetadata(file);
        const fileBlob = await file.arrayBuffer();
        
        const track: Track = {
          id: `track-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: metadata.title || file.name.replace(/\.[^/.]+$/, ''),
          artist: metadata.artist || 'Unknown Artist',
          album: metadata.album || 'Unknown Album',
          filename: file.name,
          coverArt: metadata.coverArt,
          isLocal: true,
          fileBlob: new Blob([fileBlob], { type: file.type }),
        };

        await addTrack(track);
      }
      
      await loadTracks();
      
      // Preserve playback state
      if (wasPlaying && currentIdx >= 0) {
        const audio = audioRef.current;
        if (audio && audio.paused) {
          audio.play().catch(console.error);
        }
      }
    } catch (error) {
      console.error('Error adding tracks:', error);
      throw error;
    }
  }, [loadTracks, state.isPlaying, state.currentTrackIndex]);

  const removeTrack = useCallback(async (trackId: string) => {
    try {
      const currentTrack = state.playlist[state.currentTrackIndex];
      const isCurrentTrack = currentTrack?.id === trackId;
      
      await deleteTrack(trackId);
      
      if (isCurrentTrack) {
        if (state.activeBlobUrl) {
          URL.revokeObjectURL(state.activeBlobUrl);
        }
        // Move to next track
        setState(prev => {
          const newPlaylist = prev.playlist.filter(t => t.id !== trackId);
          let newIndex = prev.currentTrackIndex;
          if (newIndex >= newPlaylist.length) {
            newIndex = Math.max(0, newPlaylist.length - 1);
          }
          return { ...prev, activeBlobUrl: null, currentTrackIndex: newIndex };
        });
      }
      
      await loadTracks();
    } catch (error) {
      console.error('Error removing track:', error);
      throw error;
    }
  }, [state.currentTrackIndex, state.playlist, state.activeBlobUrl, loadTracks]);

  const seekTo = useCallback((time: number) => {
    const audio = audioRef.current;
    if (audio && !isNaN(time) && isFinite(time)) {
      audio.currentTime = Math.max(0, Math.min(time, audio.duration || 0));
    }
  }, []);

  const value: MusicPlayerContextType = {
    ...state,
    audioRef,
    setCurrentTrackIndex: (index: number) => setState(prev => ({ ...prev, currentTrackIndex: index })),
    setIsPlaying: (playing: boolean) => setState(prev => ({ ...prev, isPlaying: playing })),
    setCurrentTime: (time: number) => setState(prev => ({ ...prev, currentTime: time })),
    setDuration: (duration: number) => setState(prev => ({ ...prev, duration })),
    setIsMuted: (muted: boolean) => setState(prev => ({ ...prev, isMuted: muted })),
    setIsMinimized: (minimized: boolean) => {
      setState(prev => ({ ...prev, isMinimized: minimized }));
      localStorage.setItem('musicPlayer_hasExplicitlyChanged', 'true');
    },
    setVolume: (volume: number) => setState(prev => ({ ...prev, volume: Math.max(0, Math.min(1, volume)) })),
    setIsShuffled: (shuffled: boolean) => setState(prev => ({ ...prev, isShuffled: shuffled })),
    setShowPlaylist: (show: boolean) => setState(prev => ({ ...prev, showPlaylist: show })),
    playTrack,
    playNext,
    playPrevious,
    togglePlayPause,
    toggleShuffle,
    toggleMute,
    addTracks,
    removeTrack,
    seekTo,
    loadTracks,
    initializeDefaultTracks,
  };

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
      <audio ref={audioRef} preload="metadata" />
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
}
