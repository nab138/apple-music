import "./ProgressBar.css";

import { useEffect, useState, useRef } from "react";
import { useMusic } from "../util/MusicContext";

function ProgressBar() {
  const [progress, setProgress] = useState<number>(0);
  const { nowPlaying } = useMusic();
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: any = null;
    if (nowPlaying) {
      const music = MusicKit.getInstance();
      const updateInterval = 50;
      interval = setInterval(() => {
        if (music.playbackState === MusicKit.PlaybackStates.playing) {
          setProgress(
            (music as any).currentPlaybackTime /
              (music as any).currentPlaybackDuration
          );
        }
      }, updateInterval);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [nowPlaying]);

  const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !nowPlaying) return;

    const music = MusicKit.getInstance();
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const newProgress = clickX / rect.width;
    music.seekToTime(newProgress * (music as any).currentPlaybackDuration);
    setProgress(newProgress);
  };

  return (
    <div
      className="progress-bar-container"
      ref={progressBarRef}
      onMouseDown={handleSeek}
    >
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress * 100}%` }}></div>
      </div>
    </div>
  );
}

export default ProgressBar;
