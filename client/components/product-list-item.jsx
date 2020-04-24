import React from 'react';

function productListItem(props) {
  return (
    <div className="card col-4">
      <img src={props.image} className='img-thumbnail' />
      <div className="card-body">
        <h5 className='class-title'>{props.name}</h5>
        <h5 className='text-secondary'>${props.price}</h5>
        <p className='card-text'>{props.description}</p>
      </div>
    </div>
  );
}

export default productListItem;
