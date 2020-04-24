import React from 'react';
import ProductList from './product-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: { name: 'catalog', params: {} }
    };
  }

  setView(name, params) {
    this.setState({
      view: { name, params }
    });
  }

  render() {
    return (
      <ProductList />
    );
  }
}
