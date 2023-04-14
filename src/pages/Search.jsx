import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    inputArtist: '',
    isDisabled: true,
    artistName: '',
    musics: '',
    didAPIrespond: false,
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
    this.setState({ inputArtist: value }, this.enableButton(value));
  };

  handleClick = async () => {
    const { inputArtist } = this.state;
    const response = await searchAlbumsAPI(inputArtist);
    this.setState({
      inputArtist: '',
      musics: response,
      didAPIrespond: true,
      artistName: inputArtist,
    });
  };

  render() {
    const { inputArtist, isDisabled, didAPIrespond, artistName, musics } = this.state;

    return (
      <div data-testid="page-search">
        Search
        <Header />
        <label htmlFor="artist-input">
          <input
            type="text"
            name="artist-input"
            id="artist-input"
            value={ inputArtist }
            onChange={ (event) => this.handleChange(event) }
            placeholder="Nome do artista"
            data-testid="search-artist-input"
          />
        </label>
        <button
          data-testid="search-artist-button"
          disabled={ isDisabled }
          onClick={ this.handleClick }
        >
          Pesquisar
        </button>
        {artistName
          && didAPIrespond ? <p>{`Resultado de álbuns de: ${artistName}`}</p> : null}
        <section>
          {musics.length > 0 ? musics.map((music, index) => (
            <div key={ index }>
              <p>{music.artistName}</p>
              <img src={ music.artworkUrl100 } alt={ music.artistName } />
              <p>{music.collectionName}</p>
              <Link
                to={ `/album/${music.collectionId}` }
                data-testid={ `link-to-album-${music.collectionId}` }
              >
                Músicas
              </Link>
            </div>
          )) : null}
        </section>
        {didAPIrespond && musics.length === 0 ? <p>Nenhum álbum foi encontrado</p> : null}
      </div>
    );
  }
}

export default Search;
