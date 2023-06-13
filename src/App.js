import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then(response => response.json())
      .then(data => {
        const shows = data.map(item => {
          const show = item.show;
          show.summary = show.summary.replace(/<[^>]+>/g, '');
          return show;
        });
        setShows(shows);
      });
  }, []);

  const handleShowClick = (show) => {
    setSelectedShow(show);
  }

  return (
    <div className="App">
      <h1>TV Shows</h1>
      {selectedShow ? (
        <div className="SelectedShow">
          <img src={selectedShow.image ? selectedShow.image.original : 'https://via.placeholder.com/600x900'} alt={selectedShow.name} />
          <h2>{selectedShow.name}</h2>
          <p>{selectedShow.summary}</p>
          <button onClick={() => setSelectedShow(null)}>Close</button>
        </div>
      ) : (
        <ul>
          {shows.map(show => (
            <li key={show.id} onClick={() => handleShowClick(show)}>
              <img src={show.image ? show.image.medium : 'https://via.placeholder.com/210x295'} alt={show.name} />
              <h2>{show.name}</h2>
              <p>{show.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
