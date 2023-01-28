import React from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ItemGallery, ListGallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';


export const ImageGallery = ({images}) => {
    return (
      <ListGallery className="gallery">
        {images.map(image => (
            <ItemGallery key={image.id}>
                <ImageGalleryItem image={image}/>
            </ItemGallery>
        ))}
        
      </ListGallery>
    );
  }


ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired).isRequired
}