import { useNavigate, useParams } from "react-router-dom";
import "./Search.css";
import { useEffect, useState } from "react";
import Song from "../components/Song";

function Search() {
  const music = MusicKit.getInstance();
  const navigate = useNavigate();
  const { term } = useParams<{ term?: string }>();

  const [results, setResults] = useState<MusicKit.Songs[]>([]);

  useEffect(() => {
    if (!term) {
      return;
    }
    const fetchSearchResults = async () => {
      const searchResults = (await music.api.music(
        `/v1/catalog/${music.storefrontId}/search`,
        {
          term,
          types: "songs",
          limit: 25,
        }
      )) as MusicKit.SearchResponse<MusicKit.Songs>;
      setResults(searchResults.data.results.songs.data);
    };
    fetchSearchResults();
  }, [term]);

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          defaultValue={term}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const searchTerm = (e.target as HTMLInputElement).value;
              if (searchTerm) {
                navigate(`/search/${searchTerm}`);
              }
            }
          }}
        />
        <button
          onClick={() => {
            const searchTerm = (
              document.querySelector(".search-bar input") as HTMLInputElement
            ).value;
            if (searchTerm) {
              navigate(`/search/${searchTerm}`);
            }
          }}
          className="search-button"
        >
          Search
        </button>
      </div>
      {results
        .filter((r) => r !== undefined)
        .map((result, i) => (
          <Song key={i} song={result} />
        ))}
    </>
  );
}

export default Search;
