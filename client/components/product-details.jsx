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
        <div className="productDetails m-4 p-3">
          <p className='pointer text-secondary' onClick={() => this.props.setView('catalog', {})}>&lt; Back to Catalog</p>
          <div className="row">
            <img src={product.image} className='col-6 detailImage'/>
            <div className='info-column col-6 d-flex flex-column justify-content-center'>
              <h2>{product.name}</h2>
              <h4 className='text-secondary'>${(product.price / 100).toFixed(2)}</h4>
              <p>{product.shortDescription}</p>
              <button className='btn btn-primary' onClick={() => this.props.addToCart({ productId: product.productId })}>Add to Cart</button>
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
