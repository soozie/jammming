import React from 'react';
import './Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
  }

  handleInputChange(event) {
    this.setState({ input: event.target.value });
  }

  handleSearch(event) {
    this.props.searchSpotify(this.state.input);
    event.preventDefault();
  }

  handleEnterKey(event) {
    if (event.key === 'Enter') {
      this.handleSearch(event);
      console.log('done');
    }
  }

  render() {
    return(
      <div className="SearchBar">
        <input
          onChange={this.handleInputChange}
          placeholder="Enter A Song, Album or Artist"
          value={this.state.input}
          onKeyPress={this.handleEnterKey}
        />
        <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    )
  }
}

export default Search;
