import "./MediaButton.css";
import { FaPause, FaPlay } from "react-icons/fa";
import { useMusic } from "../../util/MusicContext";

function PlayButton() {
  const { nowPlaying, paused } = useMusic();

  return (
    <button
      className="media-button"
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
  );
}

export default PlayButton;
