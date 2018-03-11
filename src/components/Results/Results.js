import React from 'react';
import Track from '../Track/Track.js';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
                  addTrack={this.props.addTracksToPlaylist}
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
