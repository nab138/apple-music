import "./Player.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlaylists, setShuffleEnabled } from "../util/MusicUtils";
import { FaPlay } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";

function Player() {
  const music = MusicKit.getInstance();
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState<MusicKit.LibraryPlaylists[]>([]);

  useEffect(() => {
    if (!music.isAuthorized) {
      navigate("/");
    }
    const fetchPlaylists = async () => {
      try {
        const playlists = await getPlaylists();
        setPlaylists(playlists);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };
    fetchPlaylists();
  }, []);

  return (
    <>
      <h1>Playlists</h1>
      <div className="playlists">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="playlist-card">
            <div
              style={{
                backgroundImage:
                  "url(" +
                  playlist.attributes?.artwork?.url +
                  "), url(https://is1-ssl.mzstatic.com/image/thumb/Features127/v4/75/f9/6f/75f96fa5-99ca-0854-3aae-8f76f5cb7fb5/source/200x200bb.jpeg)",
              }}
            >
              <button
                onClick={async () => {
                  await music.setQueue({ playlist: playlist.id });
                  setShuffleEnabled(false);
                  await music.play();
                }}
              >
                <FaPlay />
              </button>
              <button
                onClick={async () => {
                  await music.setQueue({ playlist: playlist.id });
                  setShuffleEnabled(true);
                  await music.play();
                }}
              >
                <FaShuffle />
              </button>
            </div>

            <p>{playlist.attributes?.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Player;
