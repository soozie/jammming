import React from 'react';
import { PulseLoader } from 'halogenium';
import MyPlaylists from '../MyPlaylists/MyPlaylists.js';
import NewPlaylist from '../NewPlaylist/NewPlaylist.js';
import '../../color_chart/colorChart.css';
import './PlaylistBox.css';

class PlaylistBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saveInProgress: false,
      myPlaylists: [],
      playlistName: '',
      selectedPlaylist: {},
      myPlaylistVisible: true,
      newPlaylistVisible: false,
      playlistViewButton: 'NEW PLAYLIST',
      saveButton: 'SAVE PLAYLIST'
    };
    this.handlePlaylistNameChange = this.handlePlaylistNameChange.bind(this);
    this.handleRemoveTracksFromPlaylist = this.handleRemoveTracksFromPlaylist.bind(this);
    this.handleSaveSpotifyPlaylist = this.handleSaveSpotifyPlaylist.bind(this);
    this.handleShowNewPlaylist = this.handleShowNewPlaylist.bind(this);
    this.handleSelectedPlaylist = this.handleSelectedPlaylist.bind(this);
  }

  componentDidMount() {
    this.getUpdatedPlaylists();
  }

  getUpdatedPlaylists() {
    if (this.props.spotify.accessToken) {
      this.props.spotify.getMyPlaylists()
      .then(response => {
        if (response.length) {
          this.setState({
            myPlaylists: response
          });
        }
      });
    }
  }

  handlePlaylistNameChange(event) {
    this.setState({ playlistName: event.target.value });
  }

  handleRemoveTracksFromPlaylist(trackObject) {
    const currentNewPlaylist = this.props.newPlaylist.filter(track => trackObject.id !== track.id);
    this.props.updatePlaylist(currentNewPlaylist);
  }

  handleSaveSpotifyPlaylist() {
    console.log(this.state.selectedPlaylist);
    if (this.state.saveButton === 'UPDATE PLAYLIST') {
      this.setState({
        saveInProgress: true
      });
      this.props.spotify.postUpdatePlaylist(this.state.selectedPlaylist.id, this.props.userId, this.props.newPlaylist)
      .then(response => {
        // response = 'success'
        // OR response = error object { error: [Object] }
        if (response === 'success') {
          this.setState({
            saveInProgress: false
          });
          this.props.updatePlaylist([]);
          // GET udpated playlists from Spotify API
          this.getUpdatedPlaylists();
        }
      })
    } else {
      this.setState({
        saveInProgress: true
      });
      this.props.spotify.postPlaylist(this.state.selectedPlaylist.name, this.props.userId, this.props.newPlaylist)
      .then(response => {
        // response = 'success'
        // OR response = error object { error: [Object] }
        if (response === 'success') {
          this.setState({
            saveInProgress: false
          });
          this.props.updatePlaylist([]);
          // GET udpated playlists from Spotify API
          this.getUpdatedPlaylists();
        }
      })
    }
  }

  handleShowNewPlaylist() {
    if (!this.state.newPlaylistVisible) {
      this.setState({
        myPlaylistVisible: false,
        newPlaylistVisible: true,
        playlistViewButton: 'MY PLAYLISTS',
        playlistName: ''
      });
    } else {
      this.setState({
        myPlaylistVisible: true,
        newPlaylistVisible: false,
        playlistViewButton: 'NEW PLAYLIST',
        saveButton: 'SAVE PLAYLIST'
      });
    }
  }

  handleSelectedPlaylist(playlistProp) {
    this.setState({
      myPlaylistVisible: false,
      newPlaylistVisible: true,
      playlistViewButton: 'MY PLAYLISTS',
      selectedPlaylist: playlistProp,
      playlistName: playlistProp.name,
      saveButton: 'UPDATE PLAYLIST'
    });
  }

  render() {
    let saveButton = this.state.saveButton;
    if (this.state.saveInProgress) {
      saveButton = (<PulseLoader color={'#FF0000'} />);
    };
    return (
      <div className="PlaylistBox">
        <NewPlaylist
          playlistName={this.state.playlistName}
          playlistNameChange={this.handlePlaylistNameChange}
          savePlaylist={this.handleSaveSpotifyPlaylist}
          newPlaylist={this.props.newPlaylist}
          removeTracksFromPlaylist={this.handleRemoveTracksFromPlaylist}
          saveInProgress={this.state.saveInProgress}
          newPlaylistVisible={this.state.newPlaylistVisible}
        />
        <MyPlaylists
          myPlaylistVisible={this.state.myPlaylistVisible}
          myPlaylists={this.state.myPlaylists}
          selectedPlaylist={this.handleSelectedPlaylist}
        />
        <div className="PlaylistBox__buttons">
          <a
            className="PlaylistBox__save"
            onClick={this.handleShowNewPlaylist}>{this.state.playlistViewButton}
          </a>
          <a
            className="PlaylistBox__save"
            onClick={this.handleSaveSpotifyPlaylist}>{saveButton}
          </a>
        </div>
      </div>
    );
  }
}

export default PlaylistBox;
