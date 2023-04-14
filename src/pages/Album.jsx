import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    musics: '',
    collectionInfo: '',
    favoriteMusics: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState(
      { musics: response.slice(1),
        collectionInfo: response[0],
        favoriteMusics: await getFavoriteSongs(),
      },
    );
  }

  updateSongs = async () => {
    const newFavorites = await getFavoriteSongs();
    this.setState({ favoriteMusics: newFavorites });
  };

  render() {
    const { musics, collectionInfo, favoriteMusics } = this.state;

    return (
      <div data-testid="page-album">
        Album
        <Header />
        {musics.length > 0
          ? (
            <div>
              <h1 data-testid="artist-name">{collectionInfo.artistName}</h1>
              <h1 data-testid="album-name">{collectionInfo.collectionName}</h1>
              {musics.map((music, index) => (
                <MusicCard
                  favoriteMusics={ favoriteMusics }
                  key={ index }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  trackId={ music.trackId }
                  music={ music }
                  updateSongs={ this.updateSongs }
                />
              ))}
            </div>) : null}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
