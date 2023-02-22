import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);
  const [currVendor, setCurrVendor] = useState(2);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    axios({
      method: 'get',
      url: `http://localhost:8080/item?vendorId=${currVendor}`,
    }).then((res) => {
      setProducts(res.data);
    });
  };

  return (
    <div>
      <a className='tempPageSign'>Temp Products Page</a>
      <ProductList products={products} />
    </div>
  );
}

export default Products;
