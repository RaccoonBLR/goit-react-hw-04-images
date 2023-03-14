import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

export const ModalWindow = styled.div`
  display: flex;
  max-width: 84%;
  max-height: 88%;
`;

export const ModalImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-contents: center;
  position: absolute;
  cursor: pointer;
  top: 24px;
  right: 24px;
  opacity: 0.3;
  transition: scale 300ms, opacity 300ms;
  color: white;
  background-color: transparent;

  :hover {
    scale: 1.1;
    opacity: 0.5;
  }

  svg {
    pointer-events: none;
  }
`;
