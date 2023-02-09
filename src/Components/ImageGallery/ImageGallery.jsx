import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ImageGallery, EmptyResponse } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';

export default class imageGallery extends Component {
  state = {
    imageList: [],
    isLoading: false,
    emptyResponse: false,
  };

  spinnerOn() {
    this.setState({ isLoading: true });
  }

  spinnerOff() {
    this.setState({ isLoading: false });
  }

  onCheckResponse(response) {
    if (response.data.hits.length >= 12) {
      this.props.onButtonRender(true);
    } else {
      this.props.onButtonRender(false);
    }
  }

  onEmptyRsponse(response) {
    response.data.hits.length === 0
      ? this.setState({ emptyResponse: true })
      : this.setState({ emptyResponse: false });
  }
  componentDidUpdate(prevProps) {
    const KEY = '32075942-33ac7ec23728def8e99295683';
    const page = this.props.onPageChange;
    const perPage = 12;
    if (
      prevProps.searchQuery !== this.props.searchQuery ||
      prevProps.onPageChange !== this.props.onPageChange
    ) {
      this.spinnerOn();
      const URL = `https://pixabay.com/api/?q=${this.props.searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;
      axios
        .get(URL)
        .then(response => {
          this.onEmptyRsponse(response);
          if (response.status === 200) {
            setTimeout(() => this.spinnerOff(), 500);
          }
          this.setState(prevState => {
            if (prevProps.searchQuery !== this.props.searchQuery) {
              return { imageList: response.data.hits };
            } else {
              return {
                imageList: [].concat(prevState.imageList, response.data.hits),
              };
            }
          });
          this.onCheckResponse(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  handleLargeImage = event => {
    let tmpImage = this.state.imageList.find(
      item => item.webformatURL === event.target.src
    );
    this.props.onUpdateState(tmpImage.largeImageURL);
    this.props.onOpenModal(true);
  };

  transmitImageClick = item => {
    console.log(item);
    this.props.handelImageClick(item);
  };

  render() {
    return (
      <div>
        {this.state.emptyResponse && (
          <EmptyResponse>
            Nothing came up for your search query &#128533;
          </EmptyResponse>
        )}
        <ImageGallery key="gallery">
          {this.state.imageList.map(item => {
            return (
              <ImageGalleryItem
                key={item.id}
                id={item.id}
                largeImageURL={item.largeImageURL}
                webformatURL={item.webformatURL}
                tags={item.tags}
                OnImageClick={this.handleLargeImage}
              />
            );
          })}
        </ImageGallery>
        {this.state.isLoading && <Loader />}
      </div>
    );
  }
}

imageGallery.propTypes = {
  searchQuery: PropTypes.string,
  onPageChange: PropTypes.number,
};
