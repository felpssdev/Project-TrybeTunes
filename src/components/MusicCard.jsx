import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import musicObjectPropTypes from '../services/musicObjectPropTypes';
import './MusicCard.css';

class MusicCard extends Component {
  state = {
    checked: false,
    isLoading: false,
    isPlaying: false,
    trackTime: '',
  };

  audioRef = React.createRef();

  handlePlay = () => {
    const audio = this.audioRef.current;

    if (!this.state.isPlaying) {
      audio.play();
      this.setState({ isPlaying: true });
    } else {
      audio.pause();
      audio.currentTime = 0;
      this.setState({ isPlaying: false });
    }
  };

  componentDidMount() {
    const { music, trackTimeMillis } = this.props;
    this.setState({ trackTime: this.formatTime(trackTimeMillis)})
    this.updateCheck(music);
  }

  componentDidUpdate() {
    const { updateSongs } = this.props;
    updateSongs();
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
      this.setState({ checked: false, isLoading: true });
      await removeSong(track);
      this.setState({ isLoading: false });
    } else {
      this.setState({ checked: true, isLoading: true });
      await addSong(track);
      this.setState({ isLoading: false });
    }
  };

  formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  

  render() {
    const { trackName, previewUrl, trackId, trackTimeMillis, music } = this.props;
    const { checked, isLoading, trackTime } = this.state;
    const buttonText = this.state.isPlaying ? "Pause" : "Play";

    return (
      isLoading ? <Loading />
        : (
          <div className='card'>
            <div className='justify-elements'>
              <audio ref={this.audioRef} data-testid="audio-component" src={ previewUrl }>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
              <button className="game-button" onClick={this.handlePlay}>
                {buttonText === "Play" ? 
                <svg className="play-icon" viewBox="0 0 40 40">
                  <path d="M 10,10 L 30,20 L 10,30 z"></path>
                </svg>
                : <svg className="play-icon" viewBox="0 0 40 40">
                    <path d="M 12,10 L 18,10 L 18,30 L 12,30 z"></path>
                    <path d="M 22,10 L 28,10 L 28,30 L 22,30 z"></path>
                  </svg>
                }
                {buttonText}
              </button>
              <p>{ trackName }</p>
            </div>
            <div className='time-check'>
              <p>{ trackTime }</p>
              <label className='container'>
                <input
                  checked={ checked }
                  id={ trackId }
                  onChange={ () => this.handleClick(music) }
                  type="checkbox"
                />
                <div className="checkmark">
                    <svg viewBox="0 0 256 256">
                    <rect fill="none" height="256" width="256"></rect>
                    <path d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z" strokeWidth="20px" stroke="#FFF" fill="none"></path></svg>
                  </div>
              </label>
            </div>
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
  updateSongs: PropTypes.func.isRequired,
};

export default MusicCard;
