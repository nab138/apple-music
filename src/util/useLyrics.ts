// hook called useLyrics
import { useEffect, useState } from "react";
import { getLyrics } from "./MusicUtils";
import { useMusic } from "./MusicContext";
import { LyricLine } from "lrclib-api";

function useLyrics() {
  const [lyrics, setLyrics] = useState<LyricLine[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { nowPlaying } = useMusic();

  useEffect(() => {
    const fetchLyrics = async () => {
      setLoading(true);
      if (!nowPlaying) {
        setLoading(false);
        return;
      }
      const lyricsData = await getLyrics(
        nowPlaying?.title,
        nowPlaying?.artistName,
        nowPlaying?.albumName
      );
      setLyrics(lyricsData);
      setLoading(false);
    };

    fetchLyrics();
  }, [nowPlaying]);

  return { lyrics, loading };
}

export default useLyrics;
