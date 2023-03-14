import React, { Component } from 'react';
import { Header, Form, Input, Button } from './Searchbar.styled';
import { FcSearch } from 'react-icons/fc';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  handleChange = ({ target }) => {
    const searchValue = target.value.toLowerCase();
    this.setState({ searchValue });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const { onSubmit } = this.props;
    const searchValue = this.state.searchValue.trim() || null;

    onSubmit(searchValue);
    this.resetSearchValueState();
  };

  resetSearchValueState = () => this.setState({ searchValue: '' });

  render() {
    const { searchValue } = this.state;

    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <FcSearch size={28} />
          </Button>

          <Input
            onChange={this.handleChange}
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
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
