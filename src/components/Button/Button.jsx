import { LoadButton, Label } from './Button.styled';
import PropTypes from 'prop-types';

export const LoadMore = ({ onLoadMore }) => (
  <LoadButton type="button" onClick={onLoadMore}>
    <Label>Load more</Label>
  </LoadButton>
);

LoadMore.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
