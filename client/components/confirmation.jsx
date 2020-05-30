import React from 'react';

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmed: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.checkConfirm = this.checkConfirm.bind(this);
  }

  checkConfirm() {
    let confirmed = 'modal-overlay';
    if (this.state.confirmed) {
      confirmed = 'modal-overlay hidden';
    }
    return confirmed;
  }

  handleClick() {
    this.setState({
      confirmed: true
    });
  }

  render() {
    const status = this.checkConfirm();
    return (
      <div className={status}>
        <div className='confirmation-modal'>
          <p>
            This website is for demonstration purposes only and no real purchases
            will be made. As such, please do not enter any personal or sensitive information.
          </p>
          <button onClick={this.handleClick} className='btn btn-primary'>I Agree</button>
        </div>
      </div>
    );
  }
}

export default Confirmation;
