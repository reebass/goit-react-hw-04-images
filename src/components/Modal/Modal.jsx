import React, { Component } from 'react';
import { ContentModal, Overlay } from "./Modal.styled";
import PropTypes from 'prop-types';


export class Modal extends Component {

static propTypes = {
  modalImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
}
  
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
}

componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
}

handleKeyDown = evt => {
    if(evt.code === "Escape") {
        this.props.onClose()
    }
}

handleBackDropClick = evt => {
    if(evt.target === evt.currentTarget) {
        this.props.onClose()
    }
}


  render() {
    const {modalImage, tags} = this.props
    return (
      <Overlay className="overlay" onClick={this.handleBackDropClick}>
        <ContentModal className="modal">
          <img src={modalImage} alt={tags} />
        </ContentModal>
      </Overlay>
    );  
  }

} 



// = ({modalImage, tags}) => {
// };