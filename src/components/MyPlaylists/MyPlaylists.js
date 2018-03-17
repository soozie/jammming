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
  displayPlaylistsList() {

  }


  render() {
    let hiddenClassName = '';
    if (!this.props.myPlaylistVisible) {
      hiddenClassName = 'MyPlaylist--hidden';
    }
    return (
      <div className={`MyPlaylist ${hiddenClassName}`}>
        <h1>My Playlists</h1>
        <div className="MyPlaylistsContainer">
          {
            this.props.myPlaylists.map(playlist => {
              return (
                <Playlist
                  playlistProp={playlist}
                  key={playlist.id}
                />
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default MyPlaylists;
