// IndexedDB utilities for storing tracks

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  filename: string;
  coverArt?: string; // Data URL
  isLocal?: boolean; // True for uploaded files
  isDefault?: boolean; // True for signature/default tracks
  localUrl?: string; // Blob URL (temporary)
  fileBlob?: Blob; // File data stored in IndexedDB
  isDeleted?: boolean;
  deletedAt?: number;
}

const DB_NAME = 'StarTooVoidMusicDB';
const DB_VERSION = 1;
const STORE_NAME = 'tracks';

let db: IDBDatabase | null = null;

export async function openDB(): Promise<IDBDatabase> {
  if (db) return db;

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = database.createObjectStore(STORE_NAME, { keyPath: 'id' });
        objectStore.createIndex('isDeleted', 'isDeleted', { unique: false });
        objectStore.createIndex('deletedAt', 'deletedAt', { unique: false });
      }
    };
  });
}

export async function addTrack(track: Track): Promise<void> {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(track);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getTrackById(trackId: string): Promise<Track | null> {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(trackId);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

export async function forceDeleteTrack(trackId: string): Promise<void> {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(trackId);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getAllTracks(): Promise<Track[]> {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => {
      const tracks = request.result.filter((track: Track) => !track.isDeleted);
      resolve(tracks);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function getTrackFile(trackId: string): Promise<Blob | null> {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(trackId);
    request.onsuccess = () => {
      const track = request.result as Track;
      if (track && track.fileBlob) {
        resolve(track.fileBlob);
      } else {
        resolve(null);
      }
    };
    request.onerror = () => reject(request.error);
  });
}

export async function deleteTrack(trackId: string): Promise<void> {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(trackId);
    request.onsuccess = () => {
      const track = request.result as Track;
      if (track) {
        track.isDeleted = true;
        track.deletedAt = Date.now();
        const updateRequest = store.put(track);
        updateRequest.onsuccess = () => resolve();
        updateRequest.onerror = () => reject(updateRequest.error);
      } else {
        resolve();
      }
    };
    request.onerror = () => reject(request.error);
  });
}

export async function getDeletedTracks(): Promise<Track[]> {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index('isDeleted');
    const request = index.getAll(IDBKeyRange.only(true));
    request.onsuccess = () => {
      const tracks = request.result.sort((a: Track, b: Track) => 
        (b.deletedAt || 0) - (a.deletedAt || 0)
      );
      resolve(tracks);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function restoreTrack(trackId: string): Promise<void> {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(trackId);
    request.onsuccess = () => {
      const track = request.result as Track;
      if (track) {
        track.isDeleted = false;
        delete track.deletedAt;
        const updateRequest = store.put(track);
        updateRequest.onsuccess = () => resolve();
        updateRequest.onerror = () => reject(updateRequest.error);
      } else {
        resolve();
      }
    };
    request.onerror = () => reject(request.error);
  });
}

export async function permanentlyDeleteTrack(trackId: string): Promise<void> {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(trackId);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function clearAllDeletedTracks(): Promise<void> {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index('isDeleted');
    const request = index.openCursor(IDBKeyRange.only(true));
    
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      } else {
        resolve();
      }
    };
    request.onerror = () => reject(request.error);
  });
}

// Helper to extract metadata from file
export async function extractMetadata(file: File): Promise<Partial<Track>> {
  const metadata: Partial<Track> = {
    title: file.name.replace(/\.[^/.]+$/, ''),
    artist: 'Unknown Artist',
    album: 'Unknown Album',
    filename: file.name,
  };

  // Try to extract basic info from filename
  const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
  const parts = nameWithoutExt.split(' - ');
  if (parts.length >= 2) {
    metadata.artist = parts[0].trim();
    metadata.title = parts.slice(1).join(' - ').trim();
  }

  // Try to extract metadata and cover art from MP3 file
  if (file.type === 'audio/mpeg' || file.name.endsWith('.mp3')) {
    try {
      // Dynamic import to handle browser environment
      const musicMetadata = await import('music-metadata');
      if (musicMetadata && musicMetadata.parseBlob) {
        const parsed = await musicMetadata.parseBlob(file);
        
        if (parsed.common.title) metadata.title = parsed.common.title;
        if (parsed.common.artist) metadata.artist = parsed.common.artist;
        if (parsed.common.album) metadata.album = parsed.common.album;
        
        // Extract cover art
        if (parsed.common.picture && parsed.common.picture.length > 0) {
          const picture = parsed.common.picture[0];
          // Convert Uint8Array to Blob
          const uint8Array = new Uint8Array(picture.data);
          const blob = new Blob([uint8Array], { type: picture.format || 'image/jpeg' });
          metadata.coverArt = await processCoverArt(blob);
        }
      }
    } catch (error) {
      console.warn('Could not extract metadata from MP3 (this is normal if metadata is not embedded):', error);
      // Fallback to filename parsing - this is expected for many files
    }
  }

  return metadata;
}

// Helper to resize and compress cover art
export async function processCoverArt(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxSize = 500;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          resolve(dataUrl);
        } else {
          reject(new Error('Could not get canvas context'));
        }
      };
      img.onerror = () => reject(new Error('Could not load image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}

