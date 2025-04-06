import React, { createContext, useContext, useEffect, useState } from "react";
import { getPlaylists, getNowPlaying } from "./MusicUtils";

interface MusicContextValue {
  playlists: MusicKit.LibraryPlaylists[];
  nowPlaying: MusicKit.MediaItem | null;
  paused: boolean;
  shuffleEnabled: boolean;
}

const MusicContext = createContext<MusicContextValue | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [playlists, setPlaylists] = useState<MusicKit.LibraryPlaylists[]>([]);
  const [nowPlaying, setNowPlaying] = useState<MusicKit.MediaItem | null>(null);
  const [paused, setPaused] = useState<boolean>(false);
  const [shuffleEnabled, setShuffleEnabled] = useState<boolean>(false);

  useEffect(() => {
    const music = MusicKit.getInstance();

    const fetchPlaylists = async () => {
      if (music.isAuthorized) {
        const playlists = await getPlaylists();
        setPlaylists(playlists);
      }
    };

    const handlePlaybackStateChange = () => {
      const nowPlayingItem = getNowPlaying();
      if (nowPlayingItem) {
        setNowPlaying(nowPlayingItem);
      }
      setPaused(music.playbackState !== MusicKit.PlaybackStates.playing);
    };

    const handleShuffleChange = () => {
      const shuffleMode = (music as any).shuffleMode;
      setShuffleEnabled(
        shuffleMode === (MusicKit as any).PlayerShuffleMode.songs
      );
    };

    fetchPlaylists();
    handlePlaybackStateChange();

    music.addEventListener("authorizationStatusDidChange", fetchPlaylists);
    music.addEventListener("playbackStateDidChange", handlePlaybackStateChange);
    music.addEventListener(
      "nowPlayingItemDidChange" as keyof MusicKit.Events,
      handlePlaybackStateChange
    );
    music.addEventListener(
      "shuffleModeDidChange" as keyof MusicKit.Events,
      handleShuffleChange
    );

    return () => {
      music.removeEventListener("authorizationStatusDidChange", fetchPlaylists);
      music.removeEventListener(
        "playbackStateDidChange",
        handlePlaybackStateChange
      );
      music.removeEventListener(
        "nowPlayingItemDidChange" as keyof MusicKit.Events,
        handlePlaybackStateChange
      );
      music.removeEventListener(
        "shuffleModeDidChange" as keyof MusicKit.Events,
        handleShuffleChange
      );
    };
  }, []);

  return (
    <MusicContext.Provider
      value={{ playlists, nowPlaying, paused, shuffleEnabled }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};
