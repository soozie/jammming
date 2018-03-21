import React from 'react';
import { PulseLoader } from 'halogenium';
import '../../color_chart/colorChart.css';
import './Playlist.css';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSelectPlaylist = this.handleSelectPlaylist.bind(this);
  }

  handleSelectPlaylist() {
    console.log(this.props.playlistProp);
    this.props.selectedPlaylist(this.props.playlistProp);
  }

  render() {
    const playlistTitle = this.props.playlistProp.name;
    const numOfTracks = this.props.playlistProp.tracks.total;
    return (
      <div
        className="EachPlaylist"
        onClick={this.handleSelectPlaylist}
      >
        <div className="EachPlaylist__information">
          <h3>Title: {playlistTitle}</h3>
          <p>Tracks: {numOfTracks}</p>
        </div>
      </div>
    );
  }
}

export default Playlist;
