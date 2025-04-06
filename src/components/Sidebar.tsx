import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className={"sidebar"}>
      <p className="header">Apple Music Better Edition™</p>
      <nav>
        <ul>
          <li onClick={() => navigate("/")}>
            <p>Home</p>
          </li>
          <li onClick={() => navigate("/playlists")}>
            <p>Playlists</p>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
