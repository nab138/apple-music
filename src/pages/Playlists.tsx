import "./Playlists.css";

import { setShuffleEnabled } from "../util/MusicUtils";
import { FaPlay } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import { useMusic } from "../util/MusicContext";
import { useNavigate } from "react-router-dom";

function Playlists() {
  const music = MusicKit.getInstance();
  const { playlists } = useMusic();
  const navigate = useNavigate();

  return (
    <>
      <h1>Playlists</h1>
      <div className="playlists">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="playlist-card">
            <div
              className="playlist-artwork"
              style={{
                cursor: "pointer",
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
              onClick={() => {
                navigate("/playlist/" + playlist.id);
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

export default Playlists;
