import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
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
        <input onChange={this.handleInputChange} placeholder="Enter A Song Title" />
        <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    )
  }
}

export default Search;
