import { ListItem, Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ images, onHandleClick }) =>
  images.map(({ id, webformatURL, tags }) => (
    <ListItem key={id} onClick={onHandleClick}>
      <Image src={webformatURL} alt={tags} id={id} />
    </ListItem>
  ));

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  onHandleClick: PropTypes.func.isRequired,
};
