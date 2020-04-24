import React from 'react';
import ProductList from './product-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    fetch('/api/products');
  }

  render() {
    return (
      <ProductList />
    );
  }
}
