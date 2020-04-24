import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  getProducts() {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => {
        this.setState({
          products: data
        });
      });
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    return (
      <div className='productList d-flex flex-wrap justify-content-around'>
        {
          this.state.products.map(product => {
            return (
              <ProductListItem
                key={product.productId}
                name={product.name}
                price={product.price}
                image={product.image}
                description={product.shortDescription}
              />
            );
          })
        }
      </div>
    );
  }
}

export default ProductList;
