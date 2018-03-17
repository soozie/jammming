import React from 'react';
import Track from '../Track/Track.js';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleAddTracksToPlaylist = this.handleAddTracksToPlaylist.bind(this);
  }

  handleAddTracksToPlaylist(trackObject) {
    const currentNewPlaylist = this.props.newPlaylist;
    let alreadyExists = false;
    currentNewPlaylist.forEach(track => {
      if (track.id === trackObject.id) {
        alreadyExists = true;
      }
    });
    if (!alreadyExists) {
      currentNewPlaylist.push(trackObject);
    }
    this.props.updatePlaylist(currentNewPlaylist);
  }

  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <div className="TrackList">
          {
            this.props.searchResults.map(track => {
              return (
                <Track
                  trackProp={track}
                  key={track.id}
                  addTrack={this.handleAddTracksToPlaylist}
                  type="result"
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Results;
