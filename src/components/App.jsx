import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import ImagesApiService from 'components/Services/imagesApiService';

const apiService = new ImagesApiService();

export const App = () => {
  const [searchQuery, setSearchQuery] = useState(null);

  const handleSearchQuery = searchValue => setSearchQuery(searchValue);

  return (
    <>
      <Searchbar onSubmit={handleSearchQuery} />
      <ImageGallery searchQuery={searchQuery} apiService={apiService} />
    </>
  );
};

// export class App extends Component {
//   state = {
//     searchImageQuery: null,
//   };

//   handleSearchImageQuery = searchImageQuery => {
//     this.setState({ searchImageQuery });
//   };

//   render() {
//     const { searchImageQuery } = this.state;

//     return (
//       <>
//         <Searchbar onSubmit={this.handleSearchImageQuery} />
//         <ImageGallery
//           searchImageQuery={searchImageQuery}
//           apiService={apiService}
//         />
//       </>
//     );
//   }
// }
