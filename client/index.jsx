import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import Header from './components/header';
import ProductList from './components/product-list';

ReactDOM.render(
  <div>
    <Header />
    <App />
    <ProductList />
  </div>,
  document.querySelector('#root')
);
