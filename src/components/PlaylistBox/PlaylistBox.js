import React from 'react';
import { PulseLoader } from 'halogenium';
import MyPlaylists from '../MyPlaylists/MyPlaylists.js';
import NewPlaylist from '../NewPlaylist/NewPlaylist.js';

class PlaylistBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saveInProgress: false,
      myPlaylists: [],
      myPlaylistVisible: true,
      newPlaylistVisible: false
    };
    this.handleRemoveTracksFromPlaylist = this.handleRemoveTracksFromPlaylist.bind(this);
    this.handleSaveSpotifyPlaylist = this.handleSaveSpotifyPlaylist.bind(this);
  }

  componentDidMount() {
    if (this.props.spotify.accessToken) {
      this.props.spotify.getMyPlaylists()
      .then(response => {
        console.log(response);
        if (response.length) {
          this.setState({
            myPlaylists: response
          });
        }
      });
    }
  }

  handleRemoveTracksFromPlaylist(trackObject) {
    const currentNewPlaylist = this.props.newPlaylist.filter(track => trackObject.id !== track.id);
    this.props.updatePlaylist(currentNewPlaylist);
  }

  handleSaveSpotifyPlaylist(newPlaylistName) {
    this.setState({
      saveInProgress: true
    });
    this.props.spotify.postPlaylist(newPlaylistName, this.props.userId, this.props.newPlaylist)
      .then(response => {
        // response = 'success'
        // OR response = error object { error: [Object] }
        if (response === 'success') {
          this.setState({
            saveInProgress: false
          });
        }
      })
  }

  render() {
    let aValue = 'SAVE PLAYLIST';
    if (this.state.saveInProgress) {
      aValue = (<PulseLoader color={'#FF0000'} />);
    };
    return (
      <div className="Playlist Box">
        <NewPlaylist
          savePlaylist={this.handleSaveSpotifyPlaylist}
          newPlaylist={this.props.newPlaylist}
          removeTracksFromPlaylist={this.handleRemoveTracksFromPlaylist}
          saveInProgress={this.state.saveInProgress}
          newPlaylistVisible={this.state.newPlaylistVisible}
        />
        <MyPlaylists
          myPlaylistVisible={this.state.myPlaylistVisible}
          myPlaylists={this.state.myPlaylists}
        />
        <div>
          <a
            className="Playlist-save"
            onClick={() => {}}>NEW PLAYLIST
          </a>
          <a
            className="Playlist-save"
            onClick={() => {}}>{aValue}
          </a>
        </div>
      </div>
    );
  }
}

export default PlaylistBox;
