import React from 'react';
import { Grid } from '@mui/material';

import styles from '../../styles/components/ProductPanel.json';
import Product from '../../components/product/Product';
import { useSelector } from 'react-redux';
import useWindowWidth from '../../hooks/useWindowWidth';

function ProductPanel(props) {
  const { items, height } = props;
  const cart = useSelector((state) => state.items.cart);
  const width = useWindowWidth();

  const checkCartCache = (itemId) => {
    if (itemId in cart) {
      return cart[itemId];
    }
    return 0;
  };

  const calcDimFactor = () => {
    if (width > 1024) {
      return 6;
    } else {
      return Math.floor(width / 159);
    }
  };

  return (
    <div style={styles.container}>
      <Grid container sx={{ ...styles.productsContainer, height: 'auto', width: `calc(159px*${calcDimFactor()})` }}>
        {items.map((item) => (
          <Grid item key={item.id}>
            <Product item={item} defaultN={checkCartCache(item.id)} />
          </Grid>
        ))}
        {items.length % 2 !== 0 && (
          <div
            style={{
              minWidth: 140,
              maxWidth: '45vw',
              minHeight: 170,
              margin: '1em 0.5em',
            }}
          />
        )}
        <div style={{ width: '100%', height: 50 }} />
      </Grid>
    </div>
  );
}

export default ProductPanel;
