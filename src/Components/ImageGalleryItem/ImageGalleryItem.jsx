import { GalleryItem, GalleryItemImage, TagA } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({
  id,
  largeImageURL,
  webformatURL,
  tags,
}) {
  return (
    <GalleryItem key={id}>
      <TagA src={largeImageURL}>
        <GalleryItemImage src={webformatURL} alt={tags} />
      </TagA>
    </GalleryItem>
  );
}
