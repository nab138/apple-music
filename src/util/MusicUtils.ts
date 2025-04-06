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

export function setShuffleEnabled(enabled: boolean) {
  const music = MusicKit.getInstance();
  (music as any).shuffleMode = enabled
    ? (MusicKit as any).PlayerShuffleMode.songs
    : (MusicKit as any).PlayerShuffleMode.off;
}
