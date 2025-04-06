import "./MediaButton.css";
import { useMusic } from "../../util/MusicContext";
import { FaShuffle } from "react-icons/fa6";
import { setShuffleEnabled } from "../../util/MusicUtils";
import { useCallback } from "react";

function ShuffleButton() {
  const { nowPlaying, shuffleEnabled } = useMusic();
  const toggleShuffle = useCallback(
    () => setShuffleEnabled(!shuffleEnabled),
    [shuffleEnabled]
  );

  return (
    <button
      className="media-button"
      disabled={nowPlaying == null}
      onClick={toggleShuffle}
    >
      <FaShuffle color={shuffleEnabled ? "var(--primary-color)" : ""} />
    </button>
  );
}

export default ShuffleButton;
