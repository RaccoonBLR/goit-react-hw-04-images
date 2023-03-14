import styled from 'styled-components';

export const Header = styled.header`
  padding: 20px 0px;

  background-color: #381e49;

  @media screen and (max-width: 479px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: stretch;
`;

export const Input = styled.input`
  padding: 4px 25px;

  width: 440px;
  height: 50px;

  border: none;
  outline: none;

  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  background-color: white;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;

  :hover svg {
    scale: 1.1;
    opacity: 1;
  }

  svg {
    transition: scale 300ms, opacity 300ms;
    pointer-events: none;
    opacity: 0.85;
  }
`;
