import "./MediaButton.css";
import { FaFastForward } from "react-icons/fa";
import { useMusic } from "../../util/MusicContext";

function SkipButton() {
  const { nowPlaying } = useMusic();

  return (
    <button
      className="media-button"
      disabled={nowPlaying == null}
      onClick={async () => {
        const music = MusicKit.getInstance();
        music.skipToNextItem();
      }}
    >
      <FaFastForward />
    </button>
  );
}

export default SkipButton;
