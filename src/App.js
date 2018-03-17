import React, { Component } from 'react';
import querystring from 'querystring';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header.js';
import Search from './components/Search/Search.js';
import Results from './components/Results/Results.js';
import PlaylistBox from './components/PlaylistBox/PlaylistBox.js';
import Spotify from './util/Spotify.js';

const spotify = new Spotify();

class App extends Component {
  constructor() {
    super();
    let isLoggedIn = false;
    if (spotify.accessToken) {
      isLoggedIn = true;
    }
    this.state = {
      searchResults: [],
      isLoggedInState: isLoggedIn,
      userId: null,
      newPlaylist: []
    };
    this.handleSpotifySearch = this.handleSpotifySearch.bind(this);
    this.handleUpdatePlaylist = this.handleUpdatePlaylist.bind(this);
  }

  componentWillMount() {
    const accessToken = spotify.accessToken;
    if (accessToken) {
      spotify.getMe().then(userObject => {
        this.setState({
          userId: userObject.id
        });
      })
    }
  }

  handleSpotifySearch(valueSpotifySearch) {
    if (!this.state.isLoggedInState) {
      spotify.loginFunction();
    } else {
      spotify.getSearch(valueSpotifySearch)
        .then(response => {
          this.setState({
            searchResults: response
          });
        })
    }
  }

  handleUpdatePlaylist(newPlaylist) {
    this.setState({ newPlaylist: newPlaylist });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="App">
          <Search
            searchSpotify={this.handleSpotifySearch}
          />
          <div className="App-playlist">
            <Results
              searchResults={this.state.searchResults}
              updatePlaylist={this.handleUpdatePlaylist}
              newPlaylist={this.state.newPlaylist}
            />
            <PlaylistBox
              spotify={spotify}
              userId={this.state.userId}
              newPlaylist={this.state.newPlaylist}
              updatePlaylist={this.handleUpdatePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
