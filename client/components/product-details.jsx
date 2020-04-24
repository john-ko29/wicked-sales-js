import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.getProductDetail = this.getProductDetail.bind(this);
  }

  componentDidMount() {
    this.getProductDetail();
  }

  getProductDetail() {
    fetch(`/api/products/${this.props.params.productId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          product: data
        });
      });
  }

  render() {
    if (this.state.product) {
      const product = this.state.product;
      return (
        <div className="productDetails m-4">
          <p className='text-secondary' onClick={() => this.props.setView('catalog', {})}>&lt; Back to Catalog</p>
          <div className="row">
            <img src={product.image} className='col detailImage'/>
            <div className='col d-flex flex-column'>
              <h2>{product.name}</h2>
              <h4 className='text-secondary'>${product.price}</h4>
              <p>{product.shortDescription}</p>
            </div>
            <p>{product.longDescription}</p>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ProductDetails;
