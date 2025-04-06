import "./FullscreenPlayer.css";

import { IoClose } from "react-icons/io5";
import { useMusic } from "../util/MusicContext";
import RewindButton from "./MediaButtons/RewindButton";
import PlayButton from "./MediaButtons/PlayButton";
import ShuffleButton from "./MediaButtons/ShuffleButton";
import SkipButton from "./MediaButtons/SkipButton";
import useLyrics from "../util/useLyrics";
import { useEffect, useRef } from "react";
import ProgressBar from "./ProgressBar";

const FullscreenPlayer: React.FC<{ close: () => void }> = ({ close }) => {
  const { nowPlaying } = useMusic();
  const { lyrics, loading } = useLyrics();
  const lyricsContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: any = null;
    if (nowPlaying && lyrics && !loading) {
      const music = MusicKit.getInstance();
      const updateInterval = 10;
      interval = setInterval(() => {
        if (music.playbackState === MusicKit.PlaybackStates.playing) {
          const currentTime = (music as any).currentPlaybackTime;
          let currentLine = null;
          for (let i = lyrics.length - 1; i >= 0; i--) {
            const line = lyrics[i];
            if (line.startTime == undefined) continue;
            if (line.startTime <= currentTime) {
              currentLine = i;
              break;
            }
          }
          if (currentLine !== undefined && currentLine != null) {
            const lineElement = (
              lyricsContainer.current?.children[0] as HTMLUListElement
            ).children[currentLine];
            if (lineElement) {
              // Scroll the line into view
              const containerTop =
                lyricsContainer.current?.getBoundingClientRect().top ?? 0;
              const lineTop = lineElement.getBoundingClientRect().top;
              const offset = lineTop - containerTop - 200; // Adjust the offset as needed
              lyricsContainer.current?.scrollTo({
                top: lyricsContainer.current.scrollTop + offset,
                behavior: "smooth",
              });
              // Highlight the current line
              for (
                let i = 0;
                i < lyricsContainer.current?.children[0].children.length!;
                i++
              ) {
                if (i === currentLine) continue;
                const child = lyricsContainer.current?.children[0].children[i];
                if (child) {
                  child.classList.remove("highlight");
                }
              }
              lineElement.classList.add("highlight");
            }
          }
        }
      }, updateInterval);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [nowPlaying, lyrics, loading]);
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
        {!loading && (
          <div className="lyrics" ref={lyricsContainer}>
            <ul>
              {lyrics?.map((line, index) => (
                <li
                  key={index}
                  onClick={() => {
                    const music = MusicKit.getInstance();
                    if (line.startTime) {
                      music.seekToTime(line.startTime);
                    }
                  }}
                >
                  {line.text}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullscreenPlayer;
