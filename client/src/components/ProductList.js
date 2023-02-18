import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const product_data = require('../tempdata/tempproducts.json');

const TempProductItem = styled.div`
  margin: 2em 1.5em;
`;

const ProductName = styled.h2``;

const TempProductImage = styled.div`
  background: #e8e8e8;
  width: 100px;
  height: 120px;
  margin-bottom: 1em;
`;

const ListContainer = styled.div`
  display: flex;
  margin: 1em 4em;
  flex-wrap: wrap;
`;

function ProductList() {
  return (
    <ListContainer>
      {product_data.map((item) => (
        <Link to={'/products/' + item.slug} state={{ selected: item }} className='linkStyle'>
          <TempProductItem>
            <TempProductImage />
            <ProductName>{item.name}</ProductName>
          </TempProductItem>
        </Link>
      ))}
    </ListContainer>
  );
}

export default ProductList;
