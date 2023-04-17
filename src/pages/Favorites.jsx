import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import './Favorite.css';

class Favorites extends Component {
  state = {
    isLoading: false,
    favoriteMusics: '',
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const favoriteSongs = await getFavoriteSongs();
    if (favoriteSongs.length > 0) {
      this.setState({
          isLoading: false,
          favoriteMusics: favoriteSongs,
      });
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
          <div className='favorites-page'>
            <Header />
            <h1>Favoritas</h1>
            <div className='favorites-musics'>
              {favoriteMusics.length > 0 ? favoriteMusics.map((music, index) => (
                <div key={ index }>
                  <MusicCard
                    {...music}
                    favoriteMusics={ favoriteMusics }
                    music={ music }
                    updateSongs={ this.updateSongs }
                  />
                </div>
              )) : <h2>Ainda não há músicas favoritas</h2>}
            </div>
          </div>)
    );
  }
}

export default Favorites;
