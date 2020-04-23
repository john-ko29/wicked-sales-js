import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    fetch('/api/products');
  }

  render() {
    return (
      <h1>App</h1>
    );
  }
}
