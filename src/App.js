import React, { Component } from 'react';

import { AppStyle } from './App.styled';
import Searchbar from './Components/Searchbar/Searchbar.jsx';
import ImageGallery from './Components/ImageGallery/ImageGallery';
// import OpenModal from './Components/Modal/Modal';
import Button from './Components/Button/Button';

class App extends Component {
  state = {
    query: '',
    button: false,
    page: 1,
  };

  handleSearchFormSubmit = searchQuery => {
    this.setState({ query: searchQuery });
  };

  handleButtonRender = response => {
    if (response) {
      this.setState({ button: true });
    } else this.setState({ button: false });
  };

  handleChangePage = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    return (
      <AppStyle>
        <Searchbar onFormSubmit={this.handleSearchFormSubmit} />
        <ImageGallery
          searchQuery={this.state.query}
          onButtonRender={this.handleButtonRender}
          onPageChange={this.state.page}
        />
        {/* <OpenModal /> */}
        {this.state.button && <Button onBtnClick={this.handleChangePage} />}
      </AppStyle>
    );
  }
}

export default App;
