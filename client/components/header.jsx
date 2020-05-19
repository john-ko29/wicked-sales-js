import React from 'react';

function Header(props) {
  return (
    <header className='text-light bg-dark d-flex justify-content-between'>
      <h3 className='pointer ml-5' onClick={() => props.setView('catalog', {})}><span className='font-weight-bold'>$</span>Wicked Sales</h3>
      <h3 className='pointer mr-5' onClick={() => props.setView('cart', {})}>{props.cartItemCount} <i className='fas fa-shopping-cart'></i></h3>
    </header>
  );
}

export default Header;
