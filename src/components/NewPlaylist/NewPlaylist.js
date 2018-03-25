import React from 'react';
import { PulseLoader } from 'halogenium';
import Track from '../Track/Track.js';
import './NewPlaylist.css';

class NewPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }

  render() {
    let hiddenClassName = '';
    if (!this.props.newPlaylistVisible) {
      hiddenClassName = 'NewPlaylist--hidden';
    }
    return (
      <div className={`NewPlaylist ${hiddenClassName}`}>
        <input
          type="text"
          onChange={this.props.playlistNameChange}
          value={this.props.playlistName}
          placeholder="New Playlist" />
        <div className="NewPlaylist__trackList">
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
      </div>
    );
  }
}

export default NewPlaylist;
