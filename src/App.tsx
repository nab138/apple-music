import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Playlists from "./pages/Playlists";
import NotFound from "./pages/NotFound";
import Sidebar from "./components/Sidebar";
import BottomBar from "./components/BottomBar";

function App() {
  return (
    <>
      <Sidebar />
      <BottomBar />
      <div className={"content"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
