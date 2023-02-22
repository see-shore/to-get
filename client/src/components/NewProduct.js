import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const NewItem = styled.div`
  padding: 10vh;
`;

const EmptyProductData = {
  name: '',
  price: '',
  available: '',
  vendorId: '',
};

function NewProduct() {
  const [newProduct, setNewProduct] = useState(EmptyProductData);
  const formRef = useRef();

  const handleChange = (key, value) => {
    setNewProduct({ ...newProduct, [key]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formRef.current.reportValidity()) {
      axios.post('http://localhost:8080/item/new', newProduct).then((res) => {
        console.log('response ', res);
      });
      setNewProduct(EmptyProductData);
    }
  };

  return (
    <NewItem>
      <form ref={formRef}>
        <label>
          <p>Product Name</p>
          <input type='text' required value={newProduct.name} onChange={(e) => handleChange('name', e.target.value)} />
        </label>
        <label>
          <p>Vendor id</p>
          <input
            type='number'
            required
            value={newProduct.vendorId}
            onChange={(e) => handleChange('vendorId', e.target.value)}
          />
        </label>
        <label>
          <p>Price</p>
          <input
            type='number'
            required
            value={newProduct.price}
            onChange={(e) => handleChange('price', e.target.value)}
          />
        </label>
        <label>
          <p>Availability</p>
          <input
            type='number'
            required
            value={newProduct.available}
            onChange={(e) => handleChange('available', e.target.value)}
          />
        </label>
      </form>
      <div>
        <button type='submit' onClick={handleSubmit}>
          Add
        </button>
      </div>
    </NewItem>
  );
}
export default NewProduct;
