import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage, TagA } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({
  id,
  largeImageURL,
  webformatURL,
  tags,
  OnImageClick,
}) {
  return (
    <GalleryItem key={id} onClick={OnImageClick}>
      <TagA src={largeImageURL}>
        <GalleryItemImage src={webformatURL} alt={tags} />
      </TagA>
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  largeImageURL: PropTypes.string,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  OnImageClick: PropTypes.func,
};
