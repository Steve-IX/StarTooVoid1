'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle,
  Minimize2, List, X, Upload, Trash2, Music, Clock, Disc3, User, Album
} from 'lucide-react';
import { useMusicPlayer } from '@/contexts/MusicPlayerContext';

function formatTime(seconds: number): string {
  if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function formatDuration(seconds: number): string {
  if (isNaN(seconds) || !isFinite(seconds)) return '0 min';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  if (mins === 0) return `${secs} sec`;
  return `${mins} min ${secs} sec`;
}

export default function MusicPlayer() {
  const {
    playlist,
    currentTrackIndex,
    isPlaying,
    currentTime,
    duration,
    isMuted,
    isMinimized,
    volume,
    isShuffled,
    showPlaylist,
    audioRef,
    togglePlayPause,
    playNext,
    playPrevious,
    toggleShuffle,
    toggleMute,
    setVolume,
    setIsMinimized,
    setShowPlaylist,
    playTrack,
    addTracks,
    removeTrack,
    seekTo,
  } = useMusicPlayer();

  const [showDeletedTracks, setShowDeletedTracks] = useState(false);
  const [showTrackDetails, setShowTrackDetails] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  // Visualizer state
  const [visualizerBars, setVisualizerBars] = useState<number[]>(Array(40).fill(10));

  const currentTrack = currentTrackIndex >= 0 ? playlist[currentTrackIndex] : null;

  // Simulated visualizer animation when playing
  useEffect(() => {
    if (!isPlaying) {
      setVisualizerBars(Array(40).fill(10));
      return;
    }

    const interval = setInterval(() => {
      setVisualizerBars(prev => 
        prev.map(() => Math.random() * 80 + 10)
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      try {
        await addTracks(Array.from(files));
      } catch (error) {
        console.error('Error uploading files:', error);
      }
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [addTracks]);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    
    seekTo(newTime);
  }, [duration, seekTo]);

  if (isMinimized) {
    return (
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-void-deep/95 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all group"
      >
        {currentTrack?.coverArt ? (
          <img
            src={currentTrack.coverArt}
            alt={currentTrack.title}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <Music className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        )}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/50"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </motion.button>
    );
  }

  return (
    <>
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-4 right-4 z-50 w-80 bg-void-deep/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="relative px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-heading text-xs font-bold tracking-wider text-white/80">NOW PLAYING</h3>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowPlaylist(!showPlaylist)}
              className={`p-1.5 rounded transition-colors ${showPlaylist ? 'bg-white/20' : 'hover:bg-white/10'}`}
              aria-label="Toggle playlist"
            >
              <List className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1.5 hover:bg-white/10 rounded transition-colors"
              aria-label="Minimize"
            >
              <Minimize2 className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="relative p-4">
          {/* Cover art and track info row */}
          <div className="flex items-center gap-4 mb-4">
            {/* Clickable Cover Art */}
            <button
              onClick={() => currentTrack && setShowTrackDetails(true)}
              className="relative w-20 h-20 rounded-xl overflow-hidden bg-void-light flex-shrink-0 group cursor-pointer transition-transform hover:scale-105"
            >
              {currentTrack?.coverArt ? (
                <img
                  src={currentTrack.coverArt}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5">
                  <Music className="w-8 h-8 text-white/30" />
                </div>
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-body">View Details</span>
              </div>
            </button>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-body font-semibold text-white truncate text-base mb-1">
                {currentTrack?.title || 'No track'}
              </h4>
              <p className="font-body text-sm text-white/60 truncate">
                {currentTrack?.artist || 'Unknown Artist'}
              </p>
              <p className="font-body text-xs text-white/40 truncate">
                {currentTrack?.album || 'Unknown Album'}
              </p>
            </div>
          </div>

          {/* Visualizer */}
          {isPlaying && (
            <div className="mb-4 h-10 bg-void-light/30 rounded-lg flex items-end justify-center gap-0.5 px-2 overflow-hidden">
              {visualizerBars.map((height, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-white/90 to-white/50 rounded-t transition-all duration-100"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          )}

          {/* Progress bar */}
          <div
            ref={progressBarRef}
            onClick={handleProgressClick}
            className="w-full h-1.5 bg-white/10 rounded-full cursor-pointer mb-2 group"
          >
            <div
              className="h-full bg-white rounded-full relative transition-all"
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
            </div>
          </div>

          {/* Time display */}
          <div className="flex items-center justify-between text-xs text-white/50 mb-4">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <button
              onClick={toggleShuffle}
              className={`p-2 rounded-lg transition-colors ${
                isShuffled ? 'bg-white/20 text-white' : 'text-white/50 hover:bg-white/10'
              }`}
              aria-label="Shuffle"
            >
              <Shuffle className="w-4 h-4" />
            </button>
            
            <button
              onClick={playPrevious}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Previous"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            
            <button
              onClick={togglePlayPause}
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all hover:scale-105"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            
            <button
              onClick={playNext}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Next"
            >
              <SkipForward className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="p-2 rounded-lg text-white/50 hover:bg-white/10 transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-16 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-white"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-body rounded-lg transition-colors"
            >
              <Upload className="w-4 h-4" />
              Add Music
            </button>
            <button
              onClick={() => setShowDeletedTracks(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-body rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Trash
            </button>
          </div>
        </div>

        {/* Playlist */}
        <AnimatePresence>
          {showPlaylist && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-white/10 max-h-56 overflow-y-auto"
            >
              <div className="p-3 space-y-1">
                {playlist.length === 0 ? (
                  <p className="text-white/50 text-sm text-center py-4">No tracks in playlist</p>
                ) : (
                  playlist.map((track, index) => (
                    <div
                      key={track.id}
                      onClick={() => playTrack(index)}
                      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                        index === currentTrackIndex
                          ? 'bg-white/20'
                          : 'hover:bg-white/10'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-void-light flex-shrink-0 overflow-hidden">
                        {track.coverArt ? (
                          <img
                            src={track.coverArt}
                            alt={track.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Music className="w-4 h-4 text-white/50" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm text-white truncate">{track.title}</p>
                        <p className="font-body text-xs text-white/50 truncate">{track.artist}</p>
                      </div>
                      {index === currentTrackIndex && isPlaying && (
                        <div className="flex items-center gap-0.5">
                          {[0, 1, 2].map(i => (
                            <motion.div
                              key={i}
                              className="w-0.5 bg-white rounded"
                              animate={{ height: [4, 12, 4] }}
                              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                            />
                          ))}
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeTrack(track.id);
                        }}
                        className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                        aria-label="Remove track"
                      >
                        <X className="w-4 h-4 text-white/50" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Track Details Modal */}
      <AnimatePresence>
        {showTrackDetails && currentTrack && (
          <TrackDetailsModal
            track={currentTrack}
            duration={duration}
            currentTime={currentTime}
            isPlaying={isPlaying}
            onClose={() => setShowTrackDetails(false)}
            onPlayPause={togglePlayPause}
          />
        )}
      </AnimatePresence>

      {/* Deleted Tracks Manager */}
      <AnimatePresence>
        {showDeletedTracks && (
          <DeletedTracksManager onClose={() => setShowDeletedTracks(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

// Track Details Modal Component
function TrackDetailsModal({
  track,
  duration,
  currentTime,
  isPlaying,
  onClose,
  onPlayPause,
}: {
  track: { title: string; artist: string; album: string; coverArt?: string; filename: string; isLocal?: boolean };
  duration: number;
  currentTime: number;
  isPlaying: boolean;
  onClose: () => void;
  onPlayPause: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-void-deep/98 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Close button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Large Cover Art */}
        <div className="relative">
          <div className="w-full aspect-square max-h-80 bg-void-light overflow-hidden">
            {track.coverArt ? (
              <img
                src={track.coverArt}
                alt={track.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5">
                <Music className="w-32 h-32 text-white/20" />
              </div>
            )}
          </div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-void-deep via-transparent to-transparent" />
          
          {/* Play button overlay */}
          <button
            onClick={onPlayPause}
            className="absolute bottom-6 right-6 p-4 bg-white rounded-full shadow-2xl hover:scale-110 transition-transform"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-black" />
            ) : (
              <Play className="w-8 h-8 text-black ml-1" />
            )}
          </button>
        </div>

        {/* Track Info */}
        <div className="p-6 -mt-8 relative">
          {/* Title */}
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2 glow-text">
            {track.title}
          </h2>
          
          {/* Artist */}
          <p className="font-body text-lg text-white/80 mb-6">
            {track.artist}
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Album */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Album className="w-4 h-4 text-white/50" />
                <span className="font-body text-xs text-white/50 uppercase tracking-wider">Album</span>
              </div>
              <p className="font-body text-sm text-white truncate">{track.album}</p>
            </div>

            {/* Duration */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-white/50" />
                <span className="font-body text-xs text-white/50 uppercase tracking-wider">Duration</span>
              </div>
              <p className="font-body text-sm text-white">{formatDuration(duration)}</p>
            </div>

            {/* Artist */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-white/50" />
                <span className="font-body text-xs text-white/50 uppercase tracking-wider">Artist</span>
              </div>
              <p className="font-body text-sm text-white truncate">{track.artist}</p>
            </div>

            {/* Source */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Disc3 className="w-4 h-4 text-white/50" />
                <span className="font-body text-xs text-white/50 uppercase tracking-wider">Source</span>
              </div>
              <p className="font-body text-sm text-white truncate">
                {track.isLocal ? 'Local File' : 'StarTooVoid'}
              </p>
            </div>
          </div>

          {/* Progress info */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="font-body text-xs text-white/50">Progress</span>
              <span className="font-body text-xs text-white/70">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-white/80 to-white rounded-full"
                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                layoutId="progress"
              />
            </div>
          </div>

          {/* Filename */}
          <p className="mt-4 font-body text-xs text-white/30 text-center truncate">
            {track.filename}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Deleted Tracks Manager Component
function DeletedTracksManager({ onClose }: { onClose: () => void }) {
  const [deletedTracks, setDeletedTracks] = useState<any[]>([]);
  const { loadTracks } = useMusicPlayer();

  useEffect(() => {
    loadDeletedTracks();
  }, []);

  const loadDeletedTracks = async () => {
    try {
      const { getDeletedTracks } = await import('@/lib/indexedDB');
      const tracks = await getDeletedTracks();
      setDeletedTracks(tracks);
    } catch (error) {
      console.error('Error loading deleted tracks:', error);
    }
  };

  const handleRestore = async (trackId: string) => {
    try {
      const { restoreTrack } = await import('@/lib/indexedDB');
      await restoreTrack(trackId);
      await loadDeletedTracks();
      await loadTracks();
    } catch (error) {
      console.error('Error restoring track:', error);
    }
  };

  const handlePermanentDelete = async (trackId: string) => {
    if (!confirm('Permanently delete this track?')) return;
    
    try {
      const { permanentlyDeleteTrack } = await import('@/lib/indexedDB');
      await permanentlyDeleteTrack(trackId);
      await loadDeletedTracks();
    } catch (error) {
      console.error('Error deleting track:', error);
    }
  };

  const handleClearAll = async () => {
    if (!confirm('Delete all tracks in trash?')) return;
    
    try {
      const { clearAllDeletedTracks } = await import('@/lib/indexedDB');
      await clearAllDeletedTracks();
      await loadDeletedTracks();
    } catch (error) {
      console.error('Error clearing deleted tracks:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-void-deep/98 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-heading text-base font-bold text-white">Deleted Tracks</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        
        <div className="p-5 max-h-72 overflow-y-auto">
          {deletedTracks.length === 0 ? (
            <p className="text-white/50 text-center py-8 text-sm">No deleted tracks</p>
          ) : (
            <>
              <div className="flex justify-end mb-4">
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs rounded-lg transition-colors"
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-2">
                {deletedTracks.map((track) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-xl"
                  >
                    <div className="w-12 h-12 rounded-lg bg-void-light flex-shrink-0 overflow-hidden">
                      {track.coverArt ? (
                        <img
                          src={track.coverArt}
                          alt={track.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Music className="w-5 h-5 text-white/50" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm text-white truncate">{track.title}</p>
                      <p className="font-body text-xs text-white/50 truncate">{track.artist}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRestore(track.id)}
                        className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg transition-colors"
                      >
                        Restore
                      </button>
                      <button
                        onClick={() => handlePermanentDelete(track.id)}
                        className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
