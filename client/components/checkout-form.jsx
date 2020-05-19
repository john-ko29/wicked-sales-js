import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    if (event.target.name === 'name') {
      this.setState({ name: event.target.value });
    }
    if (event.target.name === 'creditCard') {
      this.setState({ creditCard: event.target.value });
    }
    if (event.target.name === 'address') {
      this.setState({ shippingAddress: event.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.placeOrder(this.state);
  }

  render() {
    return (
      <div className='m-4'>
        <h1>My Cart</h1>
        <h3 className='text-secondary'>Order Total: ${this.props.totalPrice}</h3>
        <form className="m-4" onSubmit={this.handleSubmit}>
          <label className="d-block font-weight-bold" htmlFor="name">Name</label>
          <input className="w-100 mb-3" onChange={this.handleChange} type="text" id="name" name="name" />
          <label className="d-block font-weight-bold" htmlFor="creditCard">Credit Card</label>
          <input className="w-100 mb-3" onChange={this.handleChange} type="text" id="creditCard" name="creditCard" />
          <label className="d-block font-weight-bold" htmlFor="address">Shipping Address</label>
          <textarea className="w-100 mb-3" onChange={this.handleChange} name="address" id="address" rows="4"></textarea>
          <div className='d-flex justify-content-between'>
            <p className='pointer text-secondary mb-3' onClick={() => this.props.setView('catalog', {})}>&lt; Continue Shopping</p>
            <input type="submit" value="Place Order" className='btn btn-primary' />
          </div>
        </form>

      </div>
    );
  }
}

export default CheckoutForm;
