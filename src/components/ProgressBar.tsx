import "./ProgressBar.css";

import { useEffect, useState } from "react";
import { useMusic } from "../util/MusicContext";

function ProgressBar() {
  const [progress, setProgress] = useState<number>(0);
  const { nowPlaying } = useMusic();

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

  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress * 100}%` }}></div>
      </div>
    </div>
  );
}

export default ProgressBar;
