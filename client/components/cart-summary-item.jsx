import React from 'react';

function CartSummaryItem(props) {
  return (
    <div className='m-3 row cartItem'>
      <img src={props.image} className='col-5 cartImage'/>
      <div className='col-7 d-flex flex-column justify-content-center'>
        <h2>{props.name}</h2>
        <h3 className='text-secondary'>${props.price}</h3>
        <p>{props.description}</p>
      </div>
    </div>
  );
}

export default CartSummaryItem;
