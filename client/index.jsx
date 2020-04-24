import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import Header from './components/header';

ReactDOM.render(
  <div>
    <Header />
    <App />
  </div>,
  document.querySelector('#root')
);
