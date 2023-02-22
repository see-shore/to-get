import React from 'react';
import { Grid } from '@mui/material';
import styled from 'styled-components';

const StyledGridRow = styled(Grid)`
  background: #f4f4f4;
`;

function GridRow({ product = {} }) {
  return (
    // <div>
    //   {!loading && (
    <StyledGridRow container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {/* {Array.from(Array(6)).map((_, index) => ( */}
      <Grid item xs={2} sm={4} md={4} key={1}>
        {product.name} {console.log(product)}
      </Grid>
      <Grid item xs={2} sm={4} md={4} key={1}>
        {product.available} units
      </Grid>
      <Grid item xs={2} sm={4} md={4} key={1}>
        ${product.price}
      </Grid>
      {/* ))} */}
      {/* <Box width='100%' /> */}
    </StyledGridRow>
    //   )}
    // </div>
  );
}

export default GridRow;
