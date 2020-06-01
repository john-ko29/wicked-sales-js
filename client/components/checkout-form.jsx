import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: '',
      isConfirm: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkConfirm = this.checkConfirm.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
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
    if (this.state.name === '' || this.state.creditCard === '' || this.state.shippingAddress === '') {
      return;
    }
    this.props.placeOrder(this.state);
  }

  checkConfirm() {
    if (this.state.isConfirm) {
      return <input type="submit" value="Place Order" className='btn btn-primary' />;
    }
  }

  handleConfirm() {
    this.setState(state => ({
      isConfirm: !state.isConfirm
    }));
  }

  render() {
    const submitStatus = this.checkConfirm();
    return (
      <div className='header-padding m-4'>
        <h1>My Cart</h1>
        <h3 className='text-secondary'>Order Total: ${this.props.totalPrice}</h3>
        <form className="m-4" onSubmit={this.handleSubmit}>
          <label className="d-block font-weight-bold" htmlFor="name">Name</label>
          <input className="form-control w-100 mb-3" onChange={this.handleChange} type="text" id="name" name="name" />
          <label className="d-block font-weight-bold" htmlFor="creditCard">Credit Card</label>
          <input className="form-control w-100 mb-3" onChange={this.handleChange} type="text" id="creditCard" name="creditCard" />
          <label className="d-block font-weight-bold" htmlFor="address">Shipping Address</label>
          <textarea className="form-control w-100 mb-3" onChange={this.handleChange} name="address" id="address" rows="4"></textarea>
          <input type="checkbox" onClick={this.handleConfirm} id='confirmed' name='confirmed' className='mr-1'/>
          <label htmlFor="confirmed">&#9;I understand that no real purchase is being made here, and
          that I shoud and will not use any personal or sensitive information for the inputs above.</label>
          <div className='d-flex justify-content-between'>
            <p className='pointer text-secondary mb-3' onClick={() => this.props.setView('catalog', {})}>&lt; Continue Shopping</p>
            {submitStatus}
          </div>
        </form>

      </div>
    );
  }
}

export default CheckoutForm;
