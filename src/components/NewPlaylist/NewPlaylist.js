import React from 'react';
import { PulseLoader } from 'halogenium';
import Track from '../Track/Track.js';

class NewPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: 'riri'
    };
    this.handlePlaylistNameChange = this.handlePlaylistNameChange.bind(this);
    this.handleSavePlaylist = this.handleSavePlaylist.bind(this);
  }

  handlePlaylistNameChange(event) {
    this.setState({ playlistName: event.target.value });
  }

  handleSavePlaylist() {
    this.props.savePlaylist(this.state.playlistName);
  }

  render() {
    let hiddenClassName = '';
    if (!this.props.newPlaylistVisible) {
      hiddenClassName = 'hidden';
    }
    let aValue = 'SAVE TO SPOTIFY';
    if (this.props.saveInProgress) {
      aValue = (<PulseLoader color={'#FF0000'} />);
    };
    return (
      <div className={`Playlist New ${hiddenClassName}`}>
        <input
          type="text"
          onChange={this.handlePlaylistNameChange}
          value={this.state.playlistName}
          placeholder="New Playlist" />
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
