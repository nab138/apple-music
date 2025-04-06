import { useEffect, useState } from "react";
import "./BottomBar.css";
import { getNowPlaying } from "../util/MusicUtils";
import { FaPause, FaPlay } from "react-icons/fa";

function BottomBar() {
  const [nowPlaying, setNowPlaying] = useState<MusicKit.MediaItem | null>(null);
  const [paused, setPaused] = useState<boolean>(false);
  useEffect(() => {
    const music = MusicKit.getInstance();
    const handlePlaybackStateChange = () => {
      const nowPlayingItem = getNowPlaying();
      if (nowPlayingItem) {
        setNowPlaying(nowPlayingItem);
      }
      setPaused(music.playbackState !== MusicKit.PlaybackStates.playing);
    };
    music.addEventListener("playbackStateDidChange", handlePlaybackStateChange);
    music.addEventListener(
      "nowPlayingItemDidChange" as keyof MusicKit.Events,
      handlePlaybackStateChange
    );
    return () => {
      music.removeEventListener(
        "playbackStateDidChange",
        handlePlaybackStateChange
      );
      music.removeEventListener(
        "nowPlayingItemDidChange" as keyof MusicKit.Events,
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
          <div className="controls">
            <button
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
          </div>
        </>
      )}
    </div>
  );
}

export default BottomBar;
