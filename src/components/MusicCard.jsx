import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    checked: false,
    isLoading: false,
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
    const { trackName, previewUrl, trackId } = this.props;
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
              onChange={ () => this.handleClick(trackName) }
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
};

export default MusicCard;
