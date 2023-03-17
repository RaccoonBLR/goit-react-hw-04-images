import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow, ModalImage, CloseButton } from './Modal.styled';
import { ImCross } from 'react-icons/im';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, currentModalData }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClick = ({ target, currentTarget }) =>
    target === currentTarget && onClose();

  const handleKeyDown = ({ code }) => code === 'Escape' && onClose();

  const { largeImageURL, tags } = currentModalData;

  return createPortal(
    <Overlay onClick={handleClick}>
      <ModalWindow>
        <ModalImage src={largeImageURL} alt={tags} />
      </ModalWindow>
      <CloseButton type="button" onClick={handleClick}>
        <ImCross size={36} />
      </CloseButton>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  currentModalData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
