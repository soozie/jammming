import React, { Component } from 'react';
import querystring from 'querystring';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header.js';
import Search from './components/Search/Search.js';
import Results from './components/Results/Results.js';
import PlaylistBox from './components/PlaylistBox/PlaylistBox.js';

class App extends Component {
  constructor(props) {
    super(props);
    let isLoggedIn = false;
    if (props.spotify.accessToken) {
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
    const accessToken = this.props.spotify.accessToken;
    if (accessToken) {
      this.props.spotify.getMe().then(userObject => {
        this.setState({
          userId: userObject.id
        });
      })
    }
  }

  handleSpotifySearch(valueSpotifySearch) {
    if (this.state.isLoggedInState && valueSpotifySearch) {
      this.props.spotify.getSearch(valueSpotifySearch)
      .then(response => {
        this.setState({
          searchResults: response
        });
      })
    } else if (!this.state.isLoggedInState) {
      this.props.spotify.loginFunction();
    }
  }

  handleUpdatePlaylist(newPlaylist) {
    this.setState({ newPlaylist: newPlaylist });
  }

  render() {
    return (
      <div className="Main">
        <Header />
        <div className="App">
          <Search
            searchSpotify={this.handleSpotifySearch}
          />
          <div className="App__playlist">
            <Results
              searchResults={this.state.searchResults}
              updatePlaylist={this.handleUpdatePlaylist}
              newPlaylist={this.state.newPlaylist}
            />
            <PlaylistBox
              spotify={this.props.spotify}
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
