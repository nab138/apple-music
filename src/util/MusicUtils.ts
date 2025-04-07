export async function getPlaylists() {
  const music = MusicKit.getInstance();
  const queryParameters = { limit: 100 };
  const {
    data: { data: playlists = [] },
  } = (await music.api.music(
    "/v1/me/library/playlists",
    queryParameters
  )) as MusicKit.LibraryPlaylistsResponse;

  return playlists;
}

export function getNowPlaying() {
  const music = MusicKit.getInstance();
  return (music as any).nowPlayingItem as MusicKit.MediaItem | undefined;
}

export function setShuffleEnabled(enabled: boolean) {
  const music = MusicKit.getInstance();
  (music as any).shuffleMode = enabled
    ? (MusicKit as any).PlayerShuffleMode.songs
    : (MusicKit as any).PlayerShuffleMode.off;
}

export async function getPlaylistSongs(id: string) {
  const music = MusicKit.getInstance();
  const queryParameters = { limit: 100 };
  const {
    data: { data: songs = [] },
  } = (await music.api.music(
    `/v1/me/library/playlists/${id}/tracks`,
    queryParameters
  )) as any;

  return songs as MusicKit.Songs[];
}

import { Client, LyricLine } from "lrclib-api";

const lyricsClient = new Client();

export async function getLyrics(
  songName: string,
  artistName: string,
  albumName: string,
  noAlbum = false
): Promise<LyricLine[] | null> {
  const query = noAlbum
    ? {
        track_name: songName,
        artist_name: artistName,
      }
    : {
        track_name: songName,
        artist_name: artistName,
        album_name: albumName,
      };
  try {
    let lyrics =
      (await lyricsClient.getSynced(query)) ??
      (await lyricsClient.getUnsynced(query));
    if (!lyrics && !noAlbum) {
      return getLyrics(songName, artistName, "", true);
    }
    return lyrics;
  } catch (error) {
    console.error("Error fetching lyrics:", error);

    return null;
  }
}
