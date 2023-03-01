import React, { useState } from 'react';
import { IconButton, Grid } from '@mui/material';
import {
  Remove as RemoveIcon,
  Add as AddIcon
 } from '@mui/icons-material';
 import { useDispatch } from 'react-redux';

import styles from '../../styles/components/Product.json';
import { updateCart, removeFromCart } from '../../redux/slices/itemsSlice';

function Product(props) {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const { item } = props;

  const increment = () => {
    setCount(count + 1);
    dispatch(updateCart({ itemId: item.id, quantity: count + 1 }));
  }

  const decrement = () => {
    if (count - 1 <= 0) {
      setCount(0);
      dispatch(removeFromCart(item.id))
    } else {
      setCount(count - 1);
      if (count - 1 > 0) {
        dispatch(updateCart({ itemId: item.id, quantity: count - 1 }));
      }
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
