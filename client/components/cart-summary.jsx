import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(props) {

  return (
    <div className='m-4 d-flex flex-column'>
      <p className='text-secondary mb-3' onClick={() => props.setView('catalog', {})}>&lt; Back to Catalog</p>
      <h1>Cart Items</h1>
      {
        props.cart.map(cartItem => {
          return (
            <CartSummaryItem
              key={cartItem.cartItemId}
              name={cartItem.name}
              price={cartItem.price}
              image={cartItem.image}
              description={cartItem.shortDescription}
            />
          );
        })
      }
      <h3>Total Cost: ${props.totalPrice}</h3>
    </div>
  );
}

export default CartSummary;
