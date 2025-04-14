import "./Song.css";
import React from "react";
import { setShuffleEnabled } from "../util/MusicUtils";
import { FaPlay } from "react-icons/fa";
export interface SongProps {
  song: MusicKit.Songs;
  playlistId?: string;
  playlistIndex?: number;
}

const Song: React.FC<SongProps> = ({ song, playlistId, playlistIndex }) => {
  const music = MusicKit.getInstance();

  return (
    <div
      key={song.id}
      className="song"
      onClick={async () => {
        if (!song.attributes) return;

        setShuffleEnabled(false);
        if (playlistId && playlistIndex !== undefined) {
          await music.setQueue({
            playlist: playlistId,
          });
          await music.changeToMediaAtIndex(playlistIndex);
        } else {
          await music.setQueue({
            song: song.id,
          });
          await music.play();
        }
      }}
    >
      <div
        className="artwork"
        style={{
          backgroundImage:
            "url(" +
            (song?.attributes?.artwork != undefined
              ? MusicKit.formatArtworkURL(song?.attributes?.artwork, 40, 40)
              : "") +
            "), url(https://is1-ssl.mzstatic.com/image/thumb/Features127/v4/75/f9/6f/75f96fa5-99ca-0854-3aae-8f76f5cb7fb5/source/200x200bb.jpeg)",
          width: "40px",
          height: "40px",
          borderRadius: "3px",
        }}
      >
        <button
          className="fullscreen-btn"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
          }}
        >
          <FaPlay />
        </button>
      </div>

      <div className="song-info">
        <p>{song.attributes?.name}</p>
        <p className="song-info-artist">{song.attributes?.artistName}</p>
      </div>
    </div>
  );
};

export default Song;
