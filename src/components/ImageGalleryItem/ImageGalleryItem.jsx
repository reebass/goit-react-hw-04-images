import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import { ImgGallery } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';


export const ImageGalleryItem = ({image: {largeImageURL, webformatURL, tags}}) => {
  const [modalImage, setModalImage] = useState(null)

  const onOpenModal = () => {
    setModalImage(largeImageURL);
  };

  const onCloseModal = () => {
    setModalImage(null);
  };

  return (
    <>
      <ImgGallery onClick={() => onOpenModal()} src={webformatURL} alt={tags} />
      {modalImage && (
        <Modal
          modalImage={modalImage}
          tags={tags}
          onClose={onCloseModal}
        />
      )}
    </>
  );

}


ImageGalleryItem.propTypes = {
  image: PropTypes.exact({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired
}
