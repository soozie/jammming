import React from 'react';
import { PulseLoader } from 'halogenium';
import Track from '../Track/Track.js';

class NewPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: '',
      saveInProgress: false
    };
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
    let aValue = 'SAVE TO SPOTIFY';
    if (this.state.saveInProgress) {
      aValue = (<PulseLoader color={'#FF0000'} />);
    };
    return (
      <div className="Playlist">
        <input type="text" onChange={this.handlePlaylistNameChange} value={this.state.playlistName} />
        <div className="TrackList">
          {
            this.props.newPlaylist.map(track => {
              return (
                <Track
                  trackProp={track}
                  key={track.id}
                  addTrack={this.props.removeTracksFromPlaylist}
                  type="new"
                />
              )
            })
          }
        </div>
        <a
          className="Playlist-save"
          onClick={this.handleSavePlaylist}
        >{aValue}</a>
      </div>
    );
  }
}

export default NewPlaylist;
