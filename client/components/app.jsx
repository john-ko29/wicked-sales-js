import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: { name: 'catalog', params: {} },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.getTotalPrice = this.getTotalPrice.bind(this);
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

  addToCart(product) {
    const response = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    };
    fetch('/api/carts', response)
      .then(response => response.json())
      .then(data => {
        const cart = this.state.cart.slice();
        cart.push(data);
        this.setState({ cart: cart });
      });
  }

  placeOrder(customer) {
    const response = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    };
    fetch('/api/orders', response)
      .then(response => {
        this.setState({
          cart: []
        });
        this.setView('catalog', {});
        response.json();
      });
  }

  getTotalPrice() {
    let totalPrice = 0;
    if (this.state.cart[0]) {
      for (let i = 0; i < this.state.cart.length; i++) {
        totalPrice += this.state.cart[i].price;
      }
    }
    return totalPrice;
  }

  render() {
    const totalPrice = this.getTotalPrice();
    let productPage = null;
    if (this.state.view.name === 'catalog') {
      productPage = <ProductList setView={this.setView} />;
    } else if (this.state.view.name === 'details') {
      productPage = <ProductDetails params={this.state.view.params} setView={this.setView} addToCart={this.addToCart} />;
    } else if (this.state.view.name === 'cart') {
      productPage = <CartSummary cart={this.state.cart} setView={this.setView} totalPrice={totalPrice} />;
    } else if (this.state.view.name === 'checkout') {
      productPage = <CheckoutForm />;
    }
    return (
      <div>
        <Header cartItemCount={this.state.cart.length} setView={this.setView} />
        {productPage}
      </div>
    );
  }
}
