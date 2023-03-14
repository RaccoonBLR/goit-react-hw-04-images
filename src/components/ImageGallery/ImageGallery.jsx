import React, { Component } from 'react';
import { List } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { LoadMore } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  state = {
    images: [],
    pending: false,
    showModal: false,
    showLoadMore: false,
    currentModalData: {},
    error: null,
  };

  componentDidUpdate(prevProps) {
    const prevQuery = prevProps.searchImageQuery;
    const { apiService, searchImageQuery: nextQuery } = this.props;

    if (prevQuery !== nextQuery) {
      if (!nextQuery) {
        toast.info('Please enter your request in the search box');
        return;
      }

      this.setState(({ pending }) => ({
        pending: !pending,
      }));
      apiService.resetPage();
      apiService.query = nextQuery;
      apiService
        .fetchImages()
        .then(response =>
          response.ok ? response.json() : Promise.reject(new Error('Ошибка'))
        )
        .then(({ hits: images, totalHits }) => {
          const isLastQuery = totalHits <= apiService.page * apiService.perPage;

          !totalHits &&
            toast.info(
              'Sorry, there are no images matching your search query. Please try again.'
            );

          isLastQuery &&
            totalHits &&
            toast.info(
              `We're sorry, but you've reached the end of search results.`
            );

          this.setState(({ pending }) => ({
            images,
            pending: !pending,
            showLoadMore: !isLastQuery,
          }));
        })
        .catch(error =>
          this.setState(({ pending }) => ({ error, pending: !pending }))
        );
      return;
    }
  }

  onLoadMore = () => {
    const { apiService } = this.props;

    this.props.apiService.incrementPage();
    this.setState(({ pending }) => ({
      pending: !pending,
    }));

    apiService
      .fetchImages()
      .then(response =>
        response.ok ? response.json() : Promise.reject(new Error('Ошибка'))
      )
      .then(({ hits: newImages, totalHits }) => {
        const isLastQuery = totalHits <= apiService.page * apiService.perPage;

        isLastQuery &&
          toast.info(
            `We're sorry, but you've reached the end of search results.`
          );

        this.setState(({ images, pending }) => ({
          images: [...images, ...newImages],
          pending: !pending,
          showLoadMore: !isLastQuery,
        }));
      })
      .catch(error =>
        this.setState(({ pending }) => ({ error, pending: !pending }))
      );
  };

  onToggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  onHandleClick = evt => {
    const { images } = this.state;
    const searchedId = Number(evt.target.id);

    this.setState({
      currentModalData: images.find(({ id }) => id === searchedId),
    });

    this.onToggleModal();
  };
  render() {
    const { images, pending, showLoadMore, showModal, currentModalData } =
      this.state;

    return (
      <>
        <ToastContainer />

        <List>
          <ImageGalleryItem
            images={images}
            onHandleClick={this.onHandleClick}
          />
        </List>

        {showModal && (
          <Modal
            onClose={this.onToggleModal}
            currentModalData={currentModalData}
          />
        )}

        {pending && <Loader />}

        {showLoadMore && <LoadMore onLoadMore={this.onLoadMore} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchImageQuery: PropTypes.string,
  apiService: PropTypes.object.isRequired,
};
