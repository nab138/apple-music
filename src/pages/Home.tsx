import { useEffect, useState } from "react";

function Home() {
  const [authorized, setAuthorized] = useState(false);
  useEffect(() => {
    const music = MusicKit.getInstance();
    if (music.isAuthorized) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, []);
  return (
    <div
      className="home"
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ marginBottom: "25px" }}>
        Welcome to Apple Music Better Edition™
      </h1>
      {!authorized && (
        <div>
          <p>Log in to your apple account to get started</p>
          <button
            className="start-button"
            onClick={async () => {
              await MusicKit.getInstance().authorize();
              setAuthorized(MusicKit.getInstance().isAuthorized);
            }}
          >
            Login
          </button>
        </div>
      )}
      {authorized && (
        <div>
          <h3 style={{ marginBottom: "10px" }}>You are already logged in.</h3>
          <button
            className="start-button"
            onClick={async () => {
              await MusicKit.getInstance().unauthorize();
              setAuthorized(MusicKit.getInstance().isAuthorized);
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
