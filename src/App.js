import React, { Component } from 'react';
import { AppStyle } from './App.styled';
import { Searchbar, ImageGallery, OpenModal, Button } from './Components';

export default class App extends Component {
  state = {
    query: '',
    button: false,
    modal: false,
    page: 1,
    largeImageUrl: '',
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

  handleModalRender = response => {
    if (response) {
      this.setState({ modal: true });
    } else this.setState({ modal: false });
  };

  handleImageUrl = ImageURL => {
    this.setState({ largeImageUrl: ImageURL });
  };

  componentDidUpdate(_, prevState) {
    if (prevState.modal !== this.state.modal) {
    }
  }

  handleCloseModal = e => {
    if (e.target.tagName === 'DIV' || e.target.code === 'Escape') {
      this.setState({ modal: false });
    }
  };

  handleOnBtnCloseModal = () => {
    this.setState({ modal: false });
  };

  render() {
    return (
      <AppStyle
        onClick={this.handleCloseModal}
        onKeyDown={this.handleCloseModal}
        tabIndex="0"
      >
        <Searchbar onFormSubmit={this.handleSearchFormSubmit} />
        <ImageGallery
          searchQuery={this.state.query}
          onButtonRender={this.handleButtonRender}
          onOpenModal={this.handleModalRender}
          onPageChange={this.state.page}
          onUpdateState={this.handleImageUrl}
        />
        {this.state.modal && (
          <OpenModal
            largeImage={this.state.largeImageUrl}
            onBtnCloseModal={this.handleOnBtnCloseModal}
          />
        )}
        {this.state.button && <Button onBtnClick={this.handleChangePage} />}
      </AppStyle>
    );
  }
}
