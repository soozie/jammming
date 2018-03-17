import React from 'react';
import { PulseLoader } from 'halogenium';
import './Playlist.css';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    const playlistTitle = this.props.playlistProp.name;
    const numOfTracks = this.props.playlistProp.tracks.total;
    return (
      <div className="EachPlaylist">
        <div className="EachPlaylist__information">
          <h3>Title: {playlistTitle}</h3>
          <p>Tracks: {numOfTracks}</p>
        </div>
        <a className="EachPlaylist__action" onClick={this.handleAddRemoveTrack}>
        </a>
      </div>
    );
  }
}

export default Playlist;
