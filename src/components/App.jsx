import { useState, useEffect } from 'react';
import { Container } from './App.styled';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImagas } from './Api/Api';
import { Loader } from './Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';



export const App = () => {

  const [SearchQuery, setSearchQuery] = useState(null);
  const [Images, setImages] = useState([]);
  const [Page, setPage] = useState(1);
  const [Loading, setLoading] = useState(false);
  const [Total, setTotal] = useState(null);

  useEffect(() => {
    const perPage = 12;
    if(SearchQuery === null){
      return
    }
    setLoading(true);
      fetchImagas(SearchQuery, Page, perPage)
        .then(images => {
          if (images.hits.length === 0) {
            toast.error(`"${SearchQuery}" images not found`)
          }
          setImages(prevState => [
              ...prevState,
              ...selectKeysArrImages(images.hits)
            ])
          setTotal(Math.floor(images.totalHits / perPage))
          })
        .catch(error => toast.error(error.message))
        .finally(() => setLoading(false));
  }, [SearchQuery, Page])
  
  const selectKeysArrImages = arrImages => {
    return arrImages.map(({ tags, id, largeImageURL, webformatURL }) => {
      return { tags, id, largeImageURL, webformatURL };
    });
  };

  const hendleFormSubmit = query => {
    if (SearchQuery !== query) {
      setImages([]);
      setPage(1);
    }

    setSearchQuery(query);
  };

  const onIncrementPage = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={hendleFormSubmit} />
      {Loading && <Loader />}
      {Images.length > 0 && <ImageGallery images={Images} />}
      {Images.length > 0 && Page < Total && (
        <Button onLoadmore={onIncrementPage} />
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </Container>
  );
}
