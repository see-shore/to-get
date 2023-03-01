import React from 'react';
import { Grid } from '@mui/material';

import styles from '../../styles/components/ProductPanel.json';
import Product from '../../components/product/Product';

const DUMMY = [0, 1, 2, 3, 4, 5, 6];

function ProductPanel() {
  return (
    <Grid container style={styles.container}>
      {DUMMY.map((num) => (
        <Grid item key={num}>
          <Product />
        </Grid>
      ))}
      <div style={{ width: 150, height: 150, margin: "10px 10px 10px 10px" }} />
    </Grid>
  );
}

export default ProductPanel;
