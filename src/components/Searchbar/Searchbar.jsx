import { useState } from 'react';
import { Header, Form, Input, Button } from './Searchbar.styled';
import { FcSearch } from 'react-icons/fc';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const INITIAL_STATE = '';
  const [searchValue, setSearchValue] = useState(INITIAL_STATE);

  const handleChange = ({ target }) => {
    const value = target.value.toLowerCase();
    setSearchValue(value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const value = searchValue.trim();
    onSubmit(value);
    setSearchValue(INITIAL_STATE);
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <FcSearch size={28} />
        </Button>

        <Input
          onChange={handleChange}
          value={searchValue}
          className="input"
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
