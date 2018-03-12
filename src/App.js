import React, { Component } from 'react';
import querystring from 'querystring';
import logo from './logo.svg';
import './App.css';
import Search from './components/Search/Search.js';
import Results from './components/Results/Results.js';
import NewPlaylist from './components/NewPlaylist/NewPlaylist.js';
import Spotify, { apiKey } from './util/Spotify.js';

const spotify = new Spotify();


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
      isLoggedInState: isLoggedIn,
      newPlaylist: [],
      userId: null,
      saveInProgress: false
    };
    this.handleSpotifySearch = this.handleSpotifySearch.bind(this);
    this.handleSaveSpotifyPlaylist = this.handleSaveSpotifyPlaylist.bind(this);
    this.handleAddTracksToPlaylist = this.handleAddTracksToPlaylist.bind(this);
    this.handleRemoveTracksFromPlaylist = this.handleRemoveTracksFromPlaylist.bind(this);
  }

  componentWillMount() {
    const queryObject = querystring.parse(window.location.search.replace('?', ''));
    const accessToken = querystring.parse(window.location.hash.replace('#', '')).access_token;
    if (queryObject.error === 'access_denied') {
      alert('Puppa, loggati di nuovo');
    } else if (accessToken) {
      fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      })
      .then(response => { return response.json(); })
      .then(jsonResponse => {
        this.setState({ userId: jsonResponse.id });
      })
      .catch(error => { console.error(error); });
    }

    // access_token_url http://localhost:3000/callback#access_token=BQB402zqZn0xpU9TcWH3qzBWV4L39NMjAHZ3kKzC89eb-_3Lis_yZJ-iNOzyS9MfM0uTZ8oGg5nzV4hfU3S1m9wXa1rKnAlsX870Kgyr6Ypg1-VPKNbHjFKQWIcfVzVoX4bHUKC0hhBx8m04Iboh8UPJ4A7wzNI&token_type=Bearer&expires_in=3600&state=123
  }

  handleSpotifySearch(valueSpotifySearch) {
    if (!this.state.isLoggedInState) {
      const redirectUri = 'http:%2F%2Flocalhost:3000%2Fcallback';
      const clientId = apiKey;
      const scopes = 'playlist-modify-private%20playlist-modify-public%20playlist-read-private%20user-read-private%20user-read-email';
      const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&state=123`;
      window.location.href = url;
    } else {
      spotify.customFetch(valueSpotifySearch)
        .then(data => {
          this.setState({
            searchResults: data
          });
        })
    }
  }

  handleAddTracksToPlaylist(trackObject) {
    const currentNewPlaylist = this.state.newPlaylist;
    let alreadyExists = false;
    currentNewPlaylist.forEach(track => {
      if (track.id === trackObject.id) {
        alreadyExists = true;
      }
    });
    if (!alreadyExists) {
      currentNewPlaylist.push(trackObject);
    }
    this.setState({
      newPlaylist: currentNewPlaylist
    });
  }

  handleRemoveTracksFromPlaylist(trackObject) {
    const currentNewPlaylist = this.state.newPlaylist.filter(track => {
      if (trackObject.id !== track.id) {
        return true;
      } else {
        return false;
      }
    });
    this.setState({
      newPlaylist: currentNewPlaylist
    });
  }

  handleSaveSpotifyPlaylist(newPlaylistName) {
    const accessToken = querystring.parse(window.location.hash.replace('#', '')).access_token;
    this.setState({ saveInProgress: true });
    fetch(`https://api.spotify.com/v1/users/${this.state.userId}/playlists`, {
      method: "POST",
      body: JSON.stringify({
        name: newPlaylistName
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    })
    .then(response => { return response.json(); })
    .then(jsonResponse => {
      const playlistId = jsonResponse.id;

      fetch(`https://api.spotify.com/v1/users/${this.state.userId}/playlists/${playlistId}/tracks`, {
        method: "POST",
        body: JSON.stringify({
          uris: this.state.newPlaylist.map(track => {
            return track.uri;
          })
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      })
      .then(response => { return response.json(); })
      .then(jsonResponse => {
        console.log(jsonResponse);
        this.setState({
          newPlaylist: [],
          saveInProgress: false
        });
      })
      .catch(error => { console.error(error); });
    })
    .catch(error => { console.error(error); });
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
              savePlaylist={this.handleSaveSpotifyPlaylist}
              newPlaylist={this.state.newPlaylist}
              removeTracksFromPlaylist={this.handleRemoveTracksFromPlaylist}
              saveInProgress={this.state.saveInProgress}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
