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
