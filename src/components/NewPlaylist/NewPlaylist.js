import React from 'react';
import Track from '../Track/Track.js';

class NewPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { playlistName: '' };
    this.handlePlaylistNameChange = this.handlePlaylistNameChange.bind(this);
    this.handleSavePlaylist = this.handleSavePlaylist.bind(this);
  }

  handlePlaylistNameChange(event) {
    this.setState({ playlistName: event.target.value });
  }

  handleSavePlaylist() {
    console.log(this.state.playlistName);
    this.props.savePlaylist(this.state.playlistName);
  }

  render() {
    return (
      <div className="Playlist">
        <input type="text" onChange={this.handlePlaylistNameChange} value={this.state.playlistName} />
        <div className="TrackList">
          
        </div>
        <a className="Playlist-save" onClick={this.handleSavePlaylist}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default NewPlaylist;
