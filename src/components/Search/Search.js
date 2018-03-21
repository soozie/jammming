import React from 'react';
import '../../color_chart/colorChart.css';
import './Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInputChange(event) {
    this.setState({ input: event.target.value });
  }

  handleSearch(event) {
    this.props.searchSpotify(this.state.input);
    event.preventDefault();
  }

  render() {
    return(
      <div className="SearchBar">
        <input onChange={this.handleInputChange} placeholder="Enter A Song, Album or Artist" value={this.state.input} />
        <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    )
  }
}

export default Search;
