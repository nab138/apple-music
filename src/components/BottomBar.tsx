import { useMusic } from "../util/MusicContext";
import "./BottomBar.css";
import { FaFastForward, FaFastBackward, FaPause, FaPlay } from "react-icons/fa";

function BottomBar() {
  const { nowPlaying, paused } = useMusic();

  return (
    <div className={"bottombar"}>
      <>
        <div
          className="artwork"
          style={{
            backgroundImage:
              "url(" +
              (nowPlaying?.artwork != undefined
                ? MusicKit.formatArtworkURL(nowPlaying?.artwork!, 200, 200)
                : "") +
              "), url(https://is1-ssl.mzstatic.com/image/thumb/Features127/v4/75/f9/6f/75f96fa5-99ca-0854-3aae-8f76f5cb7fb5/source/200x200bb.jpeg)",
          }}
        ></div>
        <div>
          <h3>{nowPlaying?.title ?? "Not Playing"}</h3>
          {nowPlaying && (
            <p>
              {nowPlaying?.artistName} — {nowPlaying?.albumName}
            </p>
          )}
        </div>
        <div className="controls">
          <button
            disabled={nowPlaying == null}
            onClick={async () => {
              const music = MusicKit.getInstance();
              music.skipToPreviousItem();
            }}
          >
            <FaFastBackward />
          </button>
          <button
            disabled={nowPlaying == null}
            onClick={async () => {
              const music = MusicKit.getInstance();
              if (music.playbackState === MusicKit.PlaybackStates.playing) {
                music.pause();
              } else {
                music.play();
              }
            }}
          >
            {paused ? <FaPlay /> : <FaPause />}
          </button>
          <button
            disabled={nowPlaying == null}
            onClick={async () => {
              const music = MusicKit.getInstance();
              music.skipToNextItem();
            }}
          >
            <FaFastForward />
          </button>
        </div>
      </>
    </div>
  );
}

export default BottomBar;
