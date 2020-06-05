import React from 'react';

function CartSummaryItem(props) {
  return (
    <div className='m-3 row cartItem align-self-center'>
      <img src={props.image} className='col-5 cartImage'/>
      <div className='col-7 d-flex flex-column justify-content-center'>
        <h2>{props.name}</h2>
        <h3 className='text-secondary'>${props.price}</h3>
        <p>{props.description}</p>
        <div className="row justify-content-center">
          <button onClick={() => props.deleteCartItem(props.id)} className='btn btn-danger mr-2'>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;
