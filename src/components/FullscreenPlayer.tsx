import "./FullscreenPlayer.css";

import { IoClose } from "react-icons/io5";
import { useMusic } from "../util/MusicContext";
import RewindButton from "./MediaButtons/RewindButton";
import PlayButton from "./MediaButtons/PlayButton";
import ShuffleButton from "./MediaButtons/ShuffleButton";
import SkipButton from "./MediaButtons/SkipButton";
import ProgressBar from "./ProgressBar";
import Lyrics from "./Lyrics";

const FullscreenPlayer: React.FC<{ close: () => void }> = ({ close }) => {
  const { nowPlaying } = useMusic();

  return (
    <div className="fullscreen-overlay">
      <button className="close-btn" onClick={close}>
        <IoClose size={30} />
      </button>
      <div className="fullscreen-content">
        <div className="fullscreen-media-content">
          <div
            className="fullscreen-art"
            style={{
              backgroundImage:
                "url(" +
                (nowPlaying?.artwork != undefined
                  ? MusicKit.formatArtworkURL(nowPlaying?.artwork!, 1024, 1024)
                  : "") +
                "), url(https://is1-ssl.mzstatic.com/image/thumb/Features127/v4/75/f9/6f/75f96fa5-99ca-0854-3aae-8f76f5cb7fb5/source/1024x1024bb.jpeg)",
            }}
          />
          <h2>{nowPlaying?.title ?? "Not Playing"}</h2>
          {nowPlaying && (
            <p>
              {nowPlaying?.artistName} — {nowPlaying?.albumName}
            </p>
          )}
          <div className="fullscreen-controls" style={{ marginTop: "50px" }}>
            <RewindButton />
            <PlayButton />
            <SkipButton />
          </div>
          <ProgressBar />
          <div className="fullscreen-controls">
            <ShuffleButton />
          </div>
        </div>
        <Lyrics />
      </div>
    </div>
  );
};

export default FullscreenPlayer;
