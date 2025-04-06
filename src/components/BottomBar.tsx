import { useState } from "react";
import { useMusic } from "../util/MusicContext";
import "./BottomBar.css";
import { SlSizeFullscreen } from "react-icons/sl";
import FullscreenPlayer from "./FullscreenPlayer";
import PlayButton from "./MediaButtons/PlayButton";
import SkipButton from "./MediaButtons/SkipButton";
import RewindButton from "./MediaButtons/RewindButton";
import ShuffleButton from "./MediaButtons/ShuffleButton";

function BottomBar() {
  const { nowPlaying } = useMusic();
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  return (
    <>
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
          >
            <button
              className="fullscreen-btn"
              onClick={() => setFullscreen(true)}
            >
              <SlSizeFullscreen size={"100%"} />
            </button>
          </div>
          <div>
            <h3>{nowPlaying?.title ?? "Not Playing"}</h3>
            {nowPlaying && (
              <p>
                {nowPlaying?.artistName} — {nowPlaying?.albumName}
              </p>
            )}
          </div>
          <div className="controls">
            <RewindButton />
            <PlayButton />
            <SkipButton />
            <ShuffleButton />
          </div>
        </>
      </div>
      {fullscreen && <FullscreenPlayer close={() => setFullscreen(false)} />}
    </>
  );
}

export default BottomBar;
