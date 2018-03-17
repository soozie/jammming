import React from 'react';
import { PulseLoader } from 'halogenium';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <p /* need to change this */ >Playlist Title | Num Playlist</p>
        </div>
        <a className="Track-action" onClick={this.handleAddRemoveTrack}>
        </a>
      </div>
    );
  }
}

export default Playlist;
