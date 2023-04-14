import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    isLoading: false,
    favoriteMusics: '',
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const favoriteSongs = await getFavoriteSongs();
    if (favoriteSongs.length > 0) {
      this.setState(
        {
          isLoading: false,
          favoriteMusics: favoriteSongs,
        },
      );
    } else {
      this.setState({ isLoading: false });
    }
  }

  updateSongs = async () => {
    const newFavorites = await getFavoriteSongs();
    this.setState({ favoriteMusics: newFavorites });
  };

  render() {
    const { isLoading, favoriteMusics } = this.state;

    return (
      isLoading ? <Loading />
        : (
          <div data-testid="page-favorites">
            <Header />
            <h1>Favoritas</h1>
            <div>
              {favoriteMusics.length > 0 ? favoriteMusics.map((music, index) => (
                <MusicCard
                  favoriteMusics={ favoriteMusics }
                  key={ index }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  trackId={ music.trackId }
                  music={ music }
                  updateSongs={ this.updateSongs }
                />
              )) : <h2>Ainda não há músicas favoritas</h2>}
            </div>
          </div>)
    );
  }
}

export default Favorites;
