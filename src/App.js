import logo from "./logo.svg";
import "./App.css";
import React from "react";

function App() {
  const [lyrics, setLyrics] = React.useState("");
  const [song, setSong] = React.useState("");
  const [artist, setArtist] = React.useState("");
  const [error, setError] = React.useState("");
  return (
    <div className="App">
      <header className="App-header">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setError("");
            fetch(
              `https://api.lyrics.ovh/v1/${encodeURIComponent(
                artist
              )}/${encodeURIComponent(song)}`
            )
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Song not found");
                }
                return response.json();
              })
              .then((data) => {
                setLyrics(data.lyrics);
              })
              .catch((error) => {
                setError(error.message);
              });
          }}
        >
          <input
            type="text"
            placeholder="Artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
          <input
            type="text"
            placeholder="Song"
            value={song}
            onChange={(e) => setSong(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        {error && <p className="error">{error}</p>}
        {lyrics && <pre>{lyrics}</pre>}
      </header>
    </div>
  );
}

export default App;
