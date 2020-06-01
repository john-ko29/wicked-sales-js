import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(props) {
  if (props.cart.length !== 0) {
    return (
      <div className='header-padding m-4 d-flex flex-column'>
        <p className='pointer text-secondary mb-3' onClick={() => props.setView('catalog', {})}>&lt; Back to Catalog</p>
        <h1>Cart Items</h1>
        {
          props.cart.map(cartItem => {
            return (
              <CartSummaryItem
                key={cartItem.cartItemId}
                id={cartItem.cartItemId}
                name={cartItem.name}
                price={(cartItem.price / 100).toFixed(2)}
                image={cartItem.image}
                description={cartItem.shortDescription}
              />
            );
          })
        }
        <div className="row d-flex justify-content-between">
          <h3>Total Cost: ${props.totalPrice}</h3>
          <button className='btn btn-primary w-25' onClick={() => props.setView('checkout', {})}>Checkout</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className='m-4 d-flex flex-column'>
        <h1>There are no items in your cart.</h1>
        <p className='pointer text-secondary mb-3' onClick={() => props.setView('catalog', {})}>&lt; Back to Catalog</p>
      </div>
    );
  }
}

export default CartSummary;
