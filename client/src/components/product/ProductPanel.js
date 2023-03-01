import React from 'react';
import { Grid } from '@mui/material';

import styles from '../../styles/components/ProductPanel.json';
import Product from '../../components/product/Product';

function ProductPanel(props) {
  const { items, height } = props;

  return (
    <Grid container sx={{ ...styles.container, height: height }}>
      {items.map((item) => (
        <Grid item key={item.id}>
          <Product item={item} />
        </Grid>
      ))}
      {(items.length % 2 !== 0) &&
        <div style={{ width: 150, height: 150, margin: "10px 10px 10px 10px" }} />
      }
      <div style={{ width: '100%', height: 50 }} />
    </Grid>
  );
}

export default ProductPanel;
