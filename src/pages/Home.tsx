import { useMusic } from "../util/MusicContext";

function Home() {
  const { isAuthorized } = useMusic();
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
      {!isAuthorized && (
        <div>
          <p>Log in to your apple account to get started</p>
          <button
            className="start-button"
            onClick={async () => {
              await MusicKit.getInstance().authorize();
            }}
          >
            Login
          </button>
        </div>
      )}
      {isAuthorized && (
        <div>
          <h3 style={{ marginBottom: "10px" }}>You are already logged in.</h3>
          <button
            className="start-button"
            onClick={async () => {
              await MusicKit.getInstance().unauthorize();
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
