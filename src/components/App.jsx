import React, { Component } from 'react';
import { Container } from './App.styled';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImagas } from './Api/Api';
import { Loader } from './Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';



export class App extends Component {
  static propTypes = {
    searchQuery: PropTypes.string
  }

  state = {
    searchQuery: null,
    images: [],
    page: 1,
    loading: false,
    total: null,
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const perPage = 12;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ loading: true });

      fetchImagas(nextQuery, nextPage, perPage)
        .then(images => {
          if (images.hits.length === 0) {
            toast.error(`"${nextQuery}" images not found`)
          }
          return this.setState(prevState => ({
            images: [
              ...prevState.images,
              ...this.selectKeysArrImages(images.hits),
            ],
            total: Math.floor(images.totalHits / perPage),
          }));
        })
        .catch(error => toast.error(error.message))
        .finally(() => this.setState({ loading: false }));
    }
  }

  selectKeysArrImages = arrImages => {
    return arrImages.map(({ tags, id, largeImageURL, webformatURL }) => {
      return { tags, id, largeImageURL, webformatURL };
    });
  };

  hendleFormSubmit = searchQuery => {
    const { searchQuery: prevSearchQuery } = this.state;
    if (prevSearchQuery !== searchQuery) {
      this.setState({ images: [], page: 1 });
    }

    this.setState({ searchQuery });
  };

  onIncrementPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };



  render() {
    const { images, total, page, loading } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.hendleFormSubmit} />
        {loading && <Loader />}
        {images.length > 0 && <ImageGallery images={images} />}
        {images.length > 0 && page < total && (
          <Button onLoadmore={this.onIncrementPage} />
        )}
        <Toaster position="top-right" reverseOrder={false} />
      </Container>
    );
  }
}
