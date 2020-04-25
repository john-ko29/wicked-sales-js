import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
  }

  render() {
    return (
      <div className='m-4'>
        <h1>My Cart</h1>
        <h3 className='text-secondary'>Order Total: ${this.props.totalPrice}</h3>
        <form className="m-4">
          <label className="d-block font-weight-bold" htmlFor="name">Name</label>
          <input className="w-100 mb-3" type="text" id="name" name="name" />
          <label className="d-block font-weight-bold" htmlFor="creditCard">Credit Card</label>
          <input className="w-100 mb-3" type="text" id="creditCard" name="creditCard" />
          <label className="d-block font-weight-bold" htmlFor="address">Shipping Address</label>
          <textarea className="w-100 mb-3" name="address" id="address" rows="4"></textarea>
        </form>
        <div className='d-flex justify-content-between'>
          <p className='text-secondary mb-3' onClick={() => this.props.setView('catalog', {})}>&lt; Continue Shopping</p>
          <button className='btn btn-primary w-25'>Place Order</button>
        </div>
      </div>
    );
  }
}

export default CheckoutForm;
