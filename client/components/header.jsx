import React from 'react';

function Header(props) {
  return (
    <header className='header text-light d-flex justify-content-between'>
      <h3 className='pointer ml-5' onClick={() => props.setView('catalog', {})}><img className='choco-image' src='/images/chocobo.png'></img>Choco Shop</h3>
      <h3 className='pointer mr-5' onClick={() => props.setView('cart', {})}>{props.cartItemCount} <i className='fas fa-shopping-cart'></i></h3>
    </header>
  );
}

export default Header;
