import React, { useState } from 'react';
import { IconButton, Grid } from '@mui/material';
import {
  Remove as RemoveIcon,
  Add as AddIcon
 } from '@mui/icons-material';

import styles from '../../styles/components/Product.json';

function Product() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  }

  const decrement = () => {
    if (count <= 0) {
      setCount(0);
    } else {
      setCount(count - 1);
    }
  }

  return (
    <Grid container style={styles.container}>
      <Grid item style={styles.productName}>Product</Grid>
      <Grid item style={styles.counter}>
        <IconButton onClick={decrement}>
          <RemoveIcon />
        </IconButton>
        <Grid item style={styles.numberDisplay}>{count}</Grid>
        <IconButton onClick={increment}>
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default Product;
