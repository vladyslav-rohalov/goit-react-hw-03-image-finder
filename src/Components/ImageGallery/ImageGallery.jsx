import React, { Component } from 'react';
import axios from 'axios';
import { ImageGallery } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default class imageGallery extends Component {
  state = {
    imageList: [],
  };
  //при изменении поиска очизать массив
  componentDidUpdate(prevProps) {
    const KEY = '32075942-33ac7ec23728def8e99295683';
    const page = this.props.onPageChange;
    const perPage = 12;
    if (
      prevProps.searchQuery !== this.props.searchQuery ||
      prevProps.onPageChange !== this.props.onPageChange
    ) {
      const URL = `https://pixabay.com/api/?q=${this.props.searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;
      axios
        .get(URL)
        .then(response => {
          this.setState(prevState => {
            return {
              imageList: [].concat(prevState.imageList, response.data.hits),
            };
          });

          //---вынести в отдельный метод
          if (response.data.hits.length >= 12) {
            this.props.onButtonRender(true);
          } else {
            this.props.onButtonRender(false);
          }
          //---
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <ImageGallery key="gallery">
        {this.state.imageList.map(item => {
          return (
            <ImageGalleryItem
              id={item.id}
              largeImageURL={item.largeImageURL}
              webformatURL={item.webformatURL}
              tags={item.tags}
            />
          );
        })}
      </ImageGallery>
    );
  }
}
