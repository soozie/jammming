import React from 'react';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div className="Track">
        <div className="Track-information">
          <h3>Stronger</h3>
          <p>Britney Spears | Oops!... I Did It Again</p>
        </div>
        <a className="Track-action">-</a>
      </div>
    )
  }
}

export default Track;
