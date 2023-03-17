import { useState, useEffect } from 'react';
import { List } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { LoadMore } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { enterRequest, endOfResults, noMatches } from 'notifications';
import PropTypes from 'prop-types';

export const ImageGallery = ({ apiService, searchQuery, submitEvent }) => {
  const [images, setImages] = useState([]);
  const [pending, setPending] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    const id = 1;

    searchQuery === '' &&
      toast.info(enterRequest, {
        toastId: id,
      });
  }, [searchQuery, submitEvent]);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    onTogglePending();
    apiService.resetPage();
    apiService.query = searchQuery;
    apiService
      .fetchImages()
      .then(resp =>
        resp.ok ? resp.json() : Promise.reject(new Error('Ошибка'))
      )
      .then(({ hits, totalHits }) => {
        const isLastRequest = totalHits <= apiService.page * apiService.perPage;

        !totalHits && toast.info(noMatches);

        isLastRequest && totalHits && toast.info(endOfResults);

        setImages(hits);
        onTogglePending();
        setShowLoadMore(!isLastRequest);
      })
      .catch(error => {
        onTogglePending();
        toast.error(error);
      });
  }, [searchQuery, apiService]);

  const onToggleModal = () => setShowModal(state => !state);
  const onTogglePending = () => setPending(state => !state);

  const onHandleClick = evt => {
    const searchedId = Number(evt.target.id);
    const currentModalData = images.find(({ id }) => id === searchedId);

    setModalData(currentModalData);
    onToggleModal();
  };

  const onLoadMore = () => {
    apiService.incrementPage();
    onTogglePending();

    apiService
      .fetchImages()
      .then(resp =>
        resp.ok ? resp.json() : Promise.reject(new Error('Ошибка'))
      )
      .then(({ hits, totalHits }) => {
        const isLastRequest = totalHits <= apiService.page * apiService.perPage;

        isLastRequest && toast.info(endOfResults);

        setImages(prevImages => [...prevImages, ...hits]);
        onTogglePending();
        setShowLoadMore(!isLastRequest);
      })
      .catch(error => {
        onTogglePending();
        toast.error(error);
      });
  };

  return (
    <>
      <List>
        <ImageGalleryItem images={images} onHandleClick={onHandleClick} />
      </List>

      {showModal && (
        <Modal onClose={onToggleModal} currentModalData={modalData} />
      )}

      {pending && <Loader />}
      {showLoadMore && <LoadMore onLoadMore={onLoadMore} />}
      <ToastContainer draggable={false} autoClose={3000} theme={'light'} />
    </>
  );
};

ImageGallery.propTypes = {
  searchImageQuery: PropTypes.string,
  apiService: PropTypes.object.isRequired,
};
