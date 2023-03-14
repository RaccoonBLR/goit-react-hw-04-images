import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import ImagesApiService from 'components/Services/imagesApiService';

const apiService = new ImagesApiService();

export class App extends Component {
  state = {
    searchImageQuery: null,
  };

  handleSearchImageQuery = searchImageQuery => {
    this.setState({ searchImageQuery });
  };

  render() {
    const { searchImageQuery } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSearchImageQuery} />
        <ImageGallery
          searchImageQuery={searchImageQuery}
          apiService={apiService}
        />
      </>
    );
  }
}
