import "./MediaButton.css";
import { FaFastBackward } from "react-icons/fa";
import { useMusic } from "../../util/MusicContext";

function RewindButton() {
  const { nowPlaying } = useMusic();

  return (
    <button
      className="media-button"
      disabled={nowPlaying == null}
      onClick={async () => {
        const music = MusicKit.getInstance();
        music.skipToPreviousItem();
      }}
    >
      <FaFastBackward />
    </button>
  );
}

export default RewindButton;
