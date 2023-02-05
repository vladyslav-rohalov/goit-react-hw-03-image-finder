import React, { Component } from 'react';
import axios from 'axios';
import { ImageGallery } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const KEY = '32075942-33ac7ec23728def8e99295683';
const perPage = 12;
const page = 1;

export default class imageGallery extends Component {
  state = {
    imageList: [],
  };
  componentDidUpdate(prevProps) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      const URL = `https://pixabay.com/api/?q=${this.props.searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

      axios
        .get(URL)
        .then(response => {
          this.setState({ imageList: response.data.hits });
        })
        .catch(function (error) {
          console.log(error);
        });
      // .finally(function () {
      // });
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
        {/* <ImageGalleryItem searchResult={this.state.imageList} /> */}
      </ImageGallery>
    );
  }
}

// {this.state.imageList.map(item => {
//   return (
//     <li key={item.id}>
//       <a>
//         <img src={item.webformatURL} />
//       </a>
//     </li>
//   );
// })}
