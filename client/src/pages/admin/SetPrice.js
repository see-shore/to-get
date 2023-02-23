import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import axios from 'axios';
import styled from 'styled-components';

import NewProduct from '../../components/NewProduct';
import GridRow from '../../components/ItemRow';

const StyledGrid = styled(Grid)`
  display: flex;
  justify-content: center;
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

function SetPrice() {
  const [vendor, setVendor] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    axios({
      method: 'get',
      url: `http://localhost:8080/item?vendorId=${vendor}`,
    })
      .then((res) => {
        console.log('product list', res.data);
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleNewProduct = () => {
    loadProducts();
  };

  return (
    <StyledContainer>
      {!loading && (
        <StyledGrid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {products.map((p) => (
            <>
              <Grid item xs={2} sm={4} md={4} key={1}>
                <GridRow product={p} type={'price'} />
              </Grid>
              <Box width='100%' />
            </>
          ))}
        </StyledGrid>
      )}
      <NewProduct callback={handleNewProduct} />
    </StyledContainer>
  );
}
export default SetPrice;
