import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import ImagesApiService from 'components/Services/imagesApiService';

const apiService = new ImagesApiService();

export const App = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [submitEvent, setSubmitEvent] = useState(null);

  const handleSearchQuery = searchValue => {
    setSearchQuery(searchValue);
    setSubmitEvent(Symbol(searchValue));
  };

  return (
    <>
      <Searchbar onSubmit={handleSearchQuery} />
      <ImageGallery
        searchQuery={searchQuery}
        apiService={apiService}
        submitEvent={submitEvent}
      />
    </>
  );
};
