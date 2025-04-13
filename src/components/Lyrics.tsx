import "./Lyrics.css";

import { useEffect, useRef, useState } from "react";
import useLyrics from "../util/useLyrics";
import { useMusic } from "../util/MusicContext";
import { BsFastForwardCircle } from "react-icons/bs";
import { FaMicrophoneLines } from "react-icons/fa6";

function Lyrics() {
  const { nowPlaying } = useMusic();
  const { lyrics, loading } = useLyrics();
  const lyricsContainer = useRef<HTMLDivElement>(null);

  const [live, setLive] = useState<boolean>(true);
  const [show, setShow] = useState<boolean>(true);

  const eraseHighlight = (currentLine: number) => {
    for (let i = 0; i < lyricsContainer.current?.children.length!; i++) {
      if (i === currentLine) continue;
      const child = lyricsContainer.current?.children[i];
      if (child) {
        child.classList.remove("highlight");
      }
    }
  };

  useEffect(() => {
    let interval: any = null;
    let lastKnownTime = 0;
    let lastUpdateTimestamp = 0;

    if (nowPlaying && lyrics && !loading && show) {
      const music = MusicKit.getInstance();
      const updateInterval = 10;

      interval = setInterval(() => {
        if (music.playbackState === MusicKit.PlaybackStates.playing) {
          const currentTimestamp = performance.now();

          if (lastUpdateTimestamp) {
            const elapsedTime = (currentTimestamp - lastUpdateTimestamp) / 1000;
            lastKnownTime += elapsedTime;
          } else {
            lastKnownTime = (music as any).currentPlaybackTime;
          }

          lastUpdateTimestamp = currentTimestamp;

          let currentLine = null;
          for (let i = lyrics.length - 1; i >= 0; i--) {
            const line = lyrics[i];
            if (line.startTime == undefined) continue;
            if (line.startTime <= lastKnownTime) {
              currentLine = i;
              break;
            }
          }

          if (currentLine !== undefined && currentLine != null) {
            const lineElement = (lyricsContainer.current as HTMLDivElement)
              .children[currentLine];
            if (lineElement) {
              if (live) {
                const containerTop =
                  lyricsContainer.current?.getBoundingClientRect().top ?? 0;
                const lineTop = lineElement.getBoundingClientRect().top;
                const offset = lineTop - containerTop - 200;
                lyricsContainer.current?.scrollTo({
                  top: lyricsContainer.current.scrollTop + offset,
                  behavior: "smooth",
                });
              }

              eraseHighlight(currentLine);
              lineElement.classList.add("highlight");
            }
          } else {
            eraseHighlight(-1);
          }
        } else {
          lastUpdateTimestamp = 0;
        }
      }, updateInterval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
        eraseHighlight(-1);
      }
    };
  }, [nowPlaying, lyrics, loading, live, show]);

  useEffect(() => {
    if (lyricsContainer.current) {
      lyricsContainer.current.scrollTop = 0;
    }
  }, [lyrics]);

  return (
    <>
      {(!loading || (lyrics != null && lyrics.length > 0)) && (
        <>
          {show && (
            <div
              className={"lyrics" + (live ? " live" : "")}
              ref={lyricsContainer}
            >
              {lyrics?.map((line, index) => (
                <p
                  className={"lyric"}
                  key={index}
                  onClick={() => {
                    const music = MusicKit.getInstance();
                    if (line.startTime) {
                      music.seekToTime(line.startTime);
                    }
                  }}
                >
                  {line.text}
                </p>
              ))}
            </div>
          )}

          <div className="lyrics-buttons">
            <button
              onClick={() => {
                setShow((old) => !old);
              }}
              className="lyrics-button"
              disabled={lyrics == null || lyrics.length === 0}
            >
              <FaMicrophoneLines
                style={show ? { color: "var(--primary-color)" } : {}}
              />
            </button>
            <button
              className="lyrics-button"
              onClick={() => {
                setLive((old) => !old);
              }}
              disabled={lyrics == null || lyrics.length === 0 || !show}
            >
              <BsFastForwardCircle
                style={live ? { color: "var(--primary-color)" } : {}}
              />
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Lyrics;
