import { useEffect } from 'react';
import { ContentModal, Overlay } from './Modal.styled';
import PropTypes from 'prop-types';


export const Modal = ({ modalImage, tags, onClose }) => {
  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackDropClick = evt => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  

  return (
    <Overlay className="overlay" onClick={handleBackDropClick}>
      <ContentModal className="modal">
        <img src={modalImage} alt={tags} />
      </ContentModal>
    </Overlay>
  );
};

Modal.propTypes = {
  modalImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};
