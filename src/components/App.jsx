import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar';
import { Modal } from './Modal';
import { Button } from './Button';
import { Loader } from './Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { searchImage } from '../api/image';
import css from './styles.module.css';

export const App = () => {
  const [search, setSearch] = useState('');
  const [prevSearch, setPrevSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setLoading(true);
        const { data } = await searchImage(search, page);
        const isMoreImages =
          data.totalHits > 0 && page < Math.ceil(data.totalHits / 12);
        setImages(prevImage =>
          data.hits?.length ? [...prevImage, ...data.hits] : prevImage
        );
        setLoadMoreBtn(isMoreImages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (search) {
      fetchImage();
    }
  }, [search, page]);

  const handleSearch = ({ search }) => {
    if (search === prevSearch) {
      return alert(`Ви вже здійснили пошук за  ${search}`);
    }
    setPrevSearch(search);
    setSearch(search);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showModal = ({ largeImageURL }) => {
    setOpenModal(true);
    setModalImage(largeImageURL);
  };

  const closeModal = () => {
    setOpenModal(false);
    setModalImage('');
  };

  const isImage = Boolean(images.length);

  return (
    <>
      <Searchbar onSubmit={handleSearch} />
      {isImage && <ImageGallery showModal={showModal} items={images} />}
      {loading && <Loader />}
      {isImage && loadMoreBtn && <Button onClick={loadMore} type="button" />}
      {openModal && (
        <Modal modalImage={modalImage} close={closeModal}>
          <img src={modalImage} alt="" />
        </Modal>
      )}
      {error && <p className={css.error}>{error}</p>}
    </>
  );
};
