import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    artist: '',
    isDisabled: true,
  };

  enableButton = (value) => {
    const minLength = 2;
    if (value.length >= minLength) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  handleChange = (event) => {
    const { target: { value } } = event;
    this.setState({ artist: value }, this.enableButton(value));
  };

  render() {
    const { artist, isDisabled } = this.state;

    return (
      <div data-testid="page-search">
        Search
        <Header />
        <label htmlFor="artist-input">
          <input
            type="text"
            name="artist-input"
            id="artist-input"
            value={ artist }
            onChange={ (event) => this.handleChange(event) }
            placeholder="Nome do artista"
            data-testid="search-artist-input"
          />
        </label>
        <button
          data-testid="search-artist-button"
          disabled={ isDisabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
