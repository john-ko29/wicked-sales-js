import React from 'react';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: { name: 'catalog', params: {} },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  setView(name, params) {
    this.setState({
      view: { name: name, params: params }
    });
  }

  getCartItems() {
    fetch('/api/carts')
      .then(response => response.json())
      .then(data => {
        this.setState({
          cart: data
        });
      });
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <ProductList setView={this.setView}/>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <ProductDetails params={this.state.view.params} setView={this.setView}/>
      );
    }
  }
}
