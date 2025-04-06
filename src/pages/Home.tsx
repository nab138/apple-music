import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home">
      <h1>Welcome to the Music App</h1>
      <p>Click the button below to start listening to your favorite music!</p>
      <button
        className="start-button"
        onClick={async () => {
          await MusicKit.getInstance().authorize();
          navigate("/player");
        }}
      >
        Start Listening
      </button>
    </div>
  );
}

export default Home;
