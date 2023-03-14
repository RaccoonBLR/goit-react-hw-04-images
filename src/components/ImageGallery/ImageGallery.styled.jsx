import styled from 'styled-components';

export const List = styled.ul`
  display: grid;
  max-width: calc(100vw);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  padding: 20px;
`;
