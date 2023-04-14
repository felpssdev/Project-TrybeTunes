import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import musicObjectPropTypes from '../services/musicObjectPropTypes';

class MusicCard extends Component {
  state = {
    checked: false,
    isLoading: false,
  };

  componentDidMount() {
    const { music } = this.props;
    this.updateCheck(music);
  }

  updateCheck = (music) => {
    const { favoriteMusics } = this.props;
    if (favoriteMusics.length > 0) {
      favoriteMusics.map((favorite) => {
        if (favorite.trackName === music.trackName) {
          this.setState({ checked: true });
        }
        return null;
      });
    }
  };

  handleClick = async (track) => {
    const { checked } = this.state;

    if (checked) {
      this.setState({ checked: false });
    } else {
      this.setState({ checked: true, isLoading: true });
      await addSong(track);
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { trackName, previewUrl, trackId, music } = this.props;
    const { checked, isLoading } = this.state;

    return (
      isLoading ? <Loading />
        : (
          <div>
            <h2>{ trackName }</h2>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label
              htmlFor={ trackId }
              data-testid={ `checkbox-music-${trackId}` }
            >
              Favorita
            </label>
            <input
              checked={ checked }
              id={ trackId }
              onChange={ () => this.handleClick(music) }
              type="checkbox"
            />
          </div>)
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  favoriteMusics: PropTypes.arrayOf(PropTypes.shape(musicObjectPropTypes)).isRequired,
  music: PropTypes.shape(musicObjectPropTypes).isRequired,
};

export default MusicCard;
