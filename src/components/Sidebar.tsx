import "./Sidebar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { PiPlaylistBold } from "react-icons/pi";
import { useMusic } from "../util/MusicContext";
import { BsGrid3X3Gap } from "react-icons/bs";

function Sidebar() {
  const { playlists } = useMusic();
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname === path ? "active" : "";
  };
  return (
    <div className={"sidebar"}>
      <p className="header">Apple Music Better Edition™</p>
      <nav>
        <ul>
          <li
            onClick={() => navigate("/")}
            className={isActive("/") ? "sidebar-active" : ""}
          >
            <p className="icon-text">
              <FaHome /> Home
            </p>
          </li>
        </ul>
      </nav>
      <p className="header">Library</p>
      <nav>
        <ul></ul>
      </nav>
      <p className="header">Playlists</p>
      <nav>
        <ul>
          <li
            onClick={() => navigate("/playlists")}
            className={isActive("/playlists") ? "sidebar-active" : ""}
          >
            <p className="icon-text">
              <BsGrid3X3Gap /> Playlists
            </p>
          </li>
          {playlists.map((playlist) => (
            <li
              onClick={() => navigate("/playlist/" + playlist.id)}
              key={playlist.id}
              className={
                isActive("/playlist/" + playlist.id) ? "sidebar-active" : ""
              }
            >
              <p className="icon-text">
                <PiPlaylistBold />{" "}
                <span className="playlist-text">
                  {playlist.attributes?.name}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
