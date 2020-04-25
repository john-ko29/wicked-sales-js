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
      </div>
    );
  }
}

export default CheckoutForm;
