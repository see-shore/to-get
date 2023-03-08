import React from 'react';
import { Grid } from '@mui/material';

import styles from '../../styles/components/ProductPanel.json';
import Product from '../../components/product/Product';
import { useSelector } from 'react-redux';

function ProductPanel(props) {
  const { items, height } = props;
  const cart = useSelector((state) => state.items.cart);

  const checkCartCache = (itemId) => {
    if (itemId in cart) {
      return cart[itemId];
    }
    return 0;
  };

  return (
    <Grid container sx={{ ...styles.container, height: 'auto' }}>
      {items.map((item) => (
        <Grid item key={item.id}>
          <Product item={item} defaultN={checkCartCache(item.id)} />
        </Grid>
      ))}
      {items.length % 2 !== 0 && <div style={{ width: 150, height: 150, margin: '10px 10px 10px 10px' }} />}
      <div style={{ width: '100%', height: 50 }} />
    </Grid>
  );
}

export default ProductPanel;
