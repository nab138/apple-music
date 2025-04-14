import "./Playlist.css";

import { getPlaylistSongs, setShuffleEnabled } from "../util/MusicUtils";
import { FaPlay } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import { useMusic } from "../util/MusicContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Song from "../components/Song";

function Playlist() {
  const music = MusicKit.getInstance();
  const { playlists } = useMusic();
  const { id } = useParams<{ id: string }>();
  const playlist = playlists.find((playlist) => playlist.id === id);
  const [playlistSongs, setPlaylistSongs] = useState<MusicKit.Songs[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPlaylistSongs = async () => {
      setLoading(true);
      if (!id) {
        return;
      }
      const songs = await getPlaylistSongs(id);
      setPlaylistSongs(songs);
      setLoading(false);
    };
    fetchPlaylistSongs();
  }, [id]);
  if (!playlist || !playlist.attributes) {
    return <p>Playlist not found</p>;
  }

  return (
    <>
      <div className="playlist-header">
        <div
          className="playlist-artwork"
          style={{
            backgroundImage:
              "url(" +
              (playlist.attributes?.artwork != undefined
                ? MusicKit.formatArtworkURL(
                    playlist.attributes?.artwork!,
                    200,
                    200
                  )
                : "") +
              "), url(https://is1-ssl.mzstatic.com/image/thumb/Features127/v4/75/f9/6f/75f96fa5-99ca-0854-3aae-8f76f5cb7fb5/source/200x200bb.jpeg)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "start",
            paddingLeft: "var(--padding)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <h2>{playlist.attributes.name}</h2>
            <p>
              {playlist.attributes.description?.standard ?? "No Description"}
            </p>
          </div>
          <div style={{ display: "flex" }}>
            <button
              onClick={async () => {
                await music.setQueue({ playlist: playlist.id });
                setShuffleEnabled(false);
                await music.play();
              }}
              className="icon-text"
            >
              <FaPlay /> Play
            </button>
            <button
              onClick={async () => {
                await music.setQueue({ playlist: playlist.id });
                setShuffleEnabled(true);
                await music.play();
              }}
              className="icon-text"
            >
              <FaShuffle /> Shuffle
            </button>
          </div>
        </div>
      </div>
      {!loading && (
        <div className="playlist-songs">
          {playlistSongs.map((song, i) => (
            <Song
              song={song}
              playlistId={playlist.id}
              playlistIndex={i}
              key={i}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Playlist;
