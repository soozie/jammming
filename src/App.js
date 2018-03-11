import React, { Component } from 'react';
import querystring from 'querystring';
import logo from './logo.svg';
import './App.css';
import Search from './components/Search/Search.js';
import Results from './components/Results/Results.js';
import NewPlaylist from './components/NewPlaylist/NewPlaylist.js';
import { Spotify, apiKey } from './util/Spotify.js';

class App extends Component {
  constructor() {
    super();
    const accessToken = querystring.parse(window.location.hash.replace('#', '')).access_token;
    let isLoggedIn = false;
    if (accessToken) {
      isLoggedIn = true;
    }
    this.state = {
      searchResults: [],
      isLoggedInState: isLoggedIn
    };
    this.handleSpotifySearch = this.handleSpotifySearch.bind(this);
    this.handleSaveSpotifyPlaylist = this.handleSaveSpotifyPlaylist.bind(this);
    this.handleAddTracksToPlaylist = this.handleAddTracksToPlaylist.bind(this);
  }

  componentDidMount() {
    const queryObject = querystring.parse(window.location.search.replace('?', ''));
    if (queryObject.error === 'access_denied') {
      alert('Puppa, loggati di nuovo');
    } else if (queryObject.access_token) {
      const accessToken = querystring.parse(window.location.hash.replace('#', '')).access_token;
      console.log(accessToken);
      fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      })
      .then(response => { return response.json(); })
      .then(jsonResponse => { console.log(jsonResponse); })
      .catch(error => { console.error(error); });
    }

    // access_token_url http://localhost:3000/callback#access_token=BQB402zqZn0xpU9TcWH3qzBWV4L39NMjAHZ3kKzC89eb-_3Lis_yZJ-iNOzyS9MfM0uTZ8oGg5nzV4hfU3S1m9wXa1rKnAlsX870Kgyr6Ypg1-VPKNbHjFKQWIcfVzVoX4bHUKC0hhBx8m04Iboh8UPJ4A7wzNI&token_type=Bearer&expires_in=3600&state=123
  }

  handleSpotifySearch(valueSpotifySearch) {
    if (!this.state.isLoggedInState) {
      const redirectUri = 'http:%2F%2Flocalhost:3000%2Fcallback';
      const clientId = apiKey;
      const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user-read-private%20user-read-email&response_type=token&state=123`;
      window.location.href = url;
    } else {
      // https://api.spotify.com/v1/search
      const accessToken = querystring.parse(window.location.hash.replace('#', '')).access_token;
      fetch(`https://api.spotify.com/v1/search?q=${valueSpotifySearch}&type=track,album,artist`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      })
      .then(response => { return response.json(); })
      .then(jsonResponse => {
        const trackItems = jsonResponse.tracks.items;
        // const albumItems = jsonResponse.albums.items;
        // const artistItems = jsonResponse.artists.items;
        // const firstTrack = trackItems[0];
        this.setState({
          searchResults: trackItems
        });

      })
      .catch(error => { console.error(error); });
    }
  }

  handleAddTracksToPlaylist(trackId) {
    const accessToken = querystring.parse(window.location.hash.replace('#', '')).access_token;
    fetch(`https://api.spotify.com/v1/audio-features/${trackId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    })
    .then(response => { return response.json(); })
    .then(jsonResponse => {
      console.log(jsonResponse);
    })
    .catch(error => { console.error(error); });
  }

  handleSaveSpotifyPlaylist(newPlaylistName) {
    console.log(newPlaylistName);
    // Spotify.search(input).then(businesses => {
    //   console.log(businesses);
    //   this.setState({ businesses: businesses });
    // });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <Search
            searchSpotify={this.handleSpotifySearch}
          />
          <div className="App-playlist">
            <Results
              searchResults={this.state.searchResults}
              addTracksToPlaylist={this.handleAddTracksToPlaylist}
            />
            <NewPlaylist
              savePlaylist={this.handleAddSpotifyPlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
