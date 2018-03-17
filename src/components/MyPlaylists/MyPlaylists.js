import React from 'react';
import { PulseLoader } from 'halogenium';
import Playlist from '../Playlist/Playlist.js'

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
      hiddenClassName = 'hidden';
    }
    return (
      <div className={`Playlist My ${hiddenClassName}`}>
        <h1>My Playlists</h1>
        <div className="MyPlaylistsContainer">
          {
            this.props.myPlaylists.map(track => {
              return (
                <Playlist />
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default MyPlaylists;
