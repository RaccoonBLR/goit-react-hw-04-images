import styled from 'styled-components';

export const LoadButton = styled.button`
  display: block;
  cursor: pointer;

  height: 40px;

  padding-left: 16px;
  padding-right: 16px;
  margin: 0 auto;
  margin-bottom: 20px;

  transition: box-shadow 300ms, transform 300ms;

  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;

  border-radius: 4px;
  border-width: 0;

  background-color: #fcfcfd;

  :focus {
    box-shadow: #d6d6e7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px,
      rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
  }

  :hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px,
      rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
    transform: translateY(-2px);
  }

  :active {
    box-shadow: #d6d6e7 0 3px 7px inset;
    transform: translateY(2px);
  }
`;

export const Label = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  line-height: 1;

  color: #36395a;
`;
