import React, { useState } from 'react';
import { IconButton, Grid } from '@mui/material';
import {
  Remove as RemoveIcon,
  Add as AddIcon
 } from '@mui/icons-material';

import styles from '../../styles/components/Product.json';

function Product(props) {
  const [count, setCount] = useState(0);
  const { item } = props;

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

  const formatPrice = (price) => {
    const formattedPrice = (price / 100).toFixed(2);
    return `$${formattedPrice}`;
  }

  return (
    <Grid container sx={styles.container}>
      <Grid item sx={styles.price}>{formatPrice(item.price)}</Grid>
      <Grid item sx={styles.productName}>{item.name}</Grid>
      <Grid item sx={styles.counter}>
        <IconButton onClick={decrement}>
          <RemoveIcon />
        </IconButton>
        <Grid item sx={styles.numberDisplay}>{count}</Grid>
        <IconButton onClick={increment}>
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default Product;
