import React, { Component } from 'react';

import { AppStyle } from './App.styled';
import Searchbar from './Components/Searchbar/Searchbar.jsx';
import ImageGallery from './Components/ImageGallery/ImageGallery';
// import OpenModal from './Components/Modal/Modal';
import Button from './Components/Button/Button';

class App extends Component {
  state = {
    query: '',
  };

  handleSearchFormSubmit = searchQuery => {
    this.setState({ query: searchQuery });
  };

  render() {
    return (
      <AppStyle>
        <Searchbar onFormSubmit={this.handleSearchFormSubmit} />
        <ImageGallery searchQuery={this.state.query} />
        {/* <OpenModal /> */}
        <Button />
      </AppStyle>
    );
  }
}

export default App;
