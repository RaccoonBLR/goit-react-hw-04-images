import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow, ModalImage, CloseButton } from './Modal.styled';
import { ImCross } from 'react-icons/im';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = ({ code }) => {
    if (code === 'Escape') {
      this.props.onClose();
    }
  };

  handleClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props.currentModalData;

    return createPortal(
      <Overlay onClick={this.handleClick}>
        <ModalWindow>
          <ModalImage src={largeImageURL} alt={tags} />
        </ModalWindow>
        <CloseButton type="button" onClick={this.handleClick}>
          <ImCross size={36} />
        </CloseButton>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  currentModalData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
