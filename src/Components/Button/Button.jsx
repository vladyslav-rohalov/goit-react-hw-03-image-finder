import { Button } from './Button.styled';
import React, { Component } from 'react';

export default class button extends Component {
  onBtnClick = () => {
    this.props.onBtnClick();
  };
  render() {
    return (
      <Button type="button" onClick={this.onBtnClick}>
        Load more
      </Button>
    );
  }
}
