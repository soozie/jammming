import React from 'react';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleAddRemoveTrack = this.handleAddRemoveTrack.bind(this);
  }

  handleAddRemoveTrack(event) {
    event.preventDefault();
    const track = this.props.trackProp;
    this.props.addTrack(track);
  }

  render() {
    let aValue = '+';
    if (this.props.type === "new") {
      aValue = '--';
    };
    const titleTrack = this.props.trackProp.name;
    const artistTrack = this.props.trackProp.artists.map(artist => {
      return artist.name;
    }).join(', ');
    const albumTrack = this.props.trackProp.album.name;
    return(
      <div className="Track">
        <div className="Track-information">
          <h3>{titleTrack}</h3>
          <p>{`${artistTrack} | ${albumTrack}`}</p>
        </div>
        <a className="Track-action" onClick={this.handleAddRemoveTrack}>
          {aValue}
        </a>
      </div>
    )
  }
}

export default Track;
