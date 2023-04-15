import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './Search.css';

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
      isDisabled: true,
    });
  };

  render() {
    const { inputArtist, isDisabled, didAPIrespond, artistName, musics } = this.state;

    return (
      <div data-testid="page-search" className='search-page'>
        <Header />
        <div className='search-input'>
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
        </div>
        {artistName
          && didAPIrespond ? <h2>Resultado de álbuns de: <span className='band'>{artistName}</span></h2>: <h2>Faça uma busca!</h2>}
        {didAPIrespond && musics.length === 0 ? <h2>Nenhum álbum foi encontrado</h2> : null}
        <section className='search-albuns'>
          {musics.length > 0 ? musics.map((music, index) => (
            <div key={ index } className='albuns'>
              <img src={ music.artworkUrl100 } alt={ music.artistName } />
              <div className='album-info'>
                <p>{music.artistName}</p>
                <p>{music.collectionName}</p>
              </div>
              <Link
                to={ `/album/${music.collectionId}` }
                data-testid={ `link-to-album-${music.collectionId}` }
                className="link"
              >
              <p className='circle'>🎧</p>
              </Link>
            </div>
          )) : null}
        </section>
      </div>
    );
  }
}

export default Search;
