import { useEffect, useState } from "react";
import "./BottomBar.css";
import { getNowPlaying } from "../util/MusicUtils";

function BottomBar() {
  const [nowPlaying, setNowPlaying] = useState<MusicKit.MediaItem | null>(null);
  useEffect(() => {
    const musicKitInstance = MusicKit.getInstance();
    const handlePlaybackStateChange = () => {
      console.log("hi");
      const nowPlayingItem = getNowPlaying();
      if (nowPlayingItem) {
        console.log("Now playing:", nowPlayingItem.title);
        setNowPlaying(nowPlayingItem);
      }
    };
    musicKitInstance.addEventListener(
      "playbackStateDidChange",
      handlePlaybackStateChange
    );
    return () => {
      musicKitInstance.removeEventListener(
        "playbackStateDidChange",
        handlePlaybackStateChange
      );
    };
  }, []);
  return (
    <div className={"bottombar"}>
      {nowPlaying != undefined && (
        <>
          <div
            style={{
              width: "75px",
              height: "75px",
              backgroundSize: "cover",
              backgroundImage:
                "url(" +
                (nowPlaying?.artwork != undefined
                  ? MusicKit.formatArtworkURL(nowPlaying?.artwork!, 200, 200)
                  : "") +
                "), url(https://is1-ssl.mzstatic.com/image/thumb/Features127/v4/75/f9/6f/75f96fa5-99ca-0854-3aae-8f76f5cb7fb5/source/200x200bb.jpeg)",
            }}
          ></div>
          <div>
            <h3>{nowPlaying?.title}</h3>
            <p>
              {nowPlaying?.artistName} — {nowPlaying?.albumName}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default BottomBar;
