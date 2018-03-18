import React from 'react';
import { PulseLoader } from 'halogenium';
import Playlist from '../Playlist/Playlist.js';
import './MyPlaylists.css';

class MyPlaylists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

// display playlists of user after log-in
  displayPlaylistsList(playlist) {
    return (
      <Playlist
        playlistProp={playlist}
        key={playlist.id}
        selectedPlaylist={this.props.selectedPlaylist}
      />
    )
  }


  render() {
    let hiddenClassName = '';
    if (!this.props.myPlaylistVisible) {
      hiddenClassName = 'MyPlaylist--hidden';
    }
    return (
      <div className={`MyPlaylist ${hiddenClassName}`}>
        <h1>My Playlists</h1>
        <div className="MyPlaylists__container">
          {
            this.props.myPlaylists.map(playlist => {
              return this.displayPlaylistsList(playlist);
            })
          }
        </div>
      </div>
    );
  }
}

export default MyPlaylists;
