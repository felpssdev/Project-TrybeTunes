import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    musics: '',
    collectionInfo: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({ musics: response.slice(1), collectionInfo: response[0] });
  }

  render() {
    const { musics, collectionInfo } = this.state;

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
                  key={ index }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  trackId={ music.trackId }
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
