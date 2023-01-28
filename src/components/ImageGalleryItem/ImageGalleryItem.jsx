import React, { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import { ImgGallery } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  static propTypes = {
    image: PropTypes.exact({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  }

  state = {
    largeImageURL: null,
  };

  onOpenModal = () => {
    const {largeImageURL} = this.props.image
    this.setState({ largeImageURL });
  };

  onCloseModal = () => {
    this.setState({ largeImageURL: null });
  };

  render() {
    const { tags, webformatURL } = this.props.image;
    const { largeImageURL } = this.state;
    return (
      <>
        <ImgGallery onClick={() => this.onOpenModal()} src={webformatURL} alt={tags} />
        {largeImageURL && (
          <Modal
            modalImage={largeImageURL}
            tags={tags}
            onClose={this.onCloseModal}
          />
        )}
      </>
    );
  }
}
