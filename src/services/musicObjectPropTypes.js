import PropTypes from 'prop-types';

const musicObjectPropTypes = {
  artistId: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
  artistViewUrl: PropTypes.string.isRequired,
  artworkUrl30: PropTypes.string.isRequired,
  artworkUrl60: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  collectionCensoredName: PropTypes.string.isRequired,
  collectionExplicitness: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionPrice: PropTypes.number.isRequired,
  collectionViewUrl: PropTypes.string.isRequired,
  contentAdvisoryRating: PropTypes.string,
  country: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  discCount: PropTypes.number.isRequired,
  discNumber: PropTypes.number.isRequired,
  isStreamable: PropTypes.bool,
  kind: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  primaryGenreName: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  trackCensoredName: PropTypes.string.isRequired,
  trackCount: PropTypes.number.isRequired,
  trackExplicitness: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  trackNumber: PropTypes.number.isRequired,
  trackPrice: PropTypes.number.isRequired,
  trackTimeMillis: PropTypes.number.isRequired,
  trackViewUrl: PropTypes.string.isRequired,
  wrapperType: PropTypes.string.isRequired,
};

export default musicObjectPropTypes;
