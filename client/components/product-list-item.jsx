import React from 'react';

function productListItem(props) {
  return (
    <div className="productCard my-4" onClick={() => props.setView('details', { productId: props.productId })}>
      <img src={props.image} className='cardImg' />
      <div>
        <h5 className='class-title'>{props.name}</h5>
        <h5 className='text-secondary'>${(props.price / 100).toFixed(2)}</h5>
        <p className='card-text'>{props.description}</p>
      </div>
    </div>
  );
}

export default productListItem;
