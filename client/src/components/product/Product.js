import React, { useEffect, useState } from 'react';
import { IconButton, Grid, Dialog, DialogContent } from '@mui/material';
import { Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

import styles from '../../styles/components/Product.json';
import { updateCart, removeFromCart } from '../../redux/slices/itemsSlice';

function Product(props) {
  const dispatch = useDispatch();
  const [count, setCount] = useState(props.defaultN);
  const [open, setOpen] = useState(false);
  const { item } = props;

  useEffect(() => {
    setCount(props.defaultN);
  }, [props.defaultN]);

  const increment = () => {
    setCount(count + 1);
    dispatch(updateCart({ itemId: item.id, quantity: count + 1 }));
  };

  const decrement = () => {
    if (count - 1 <= 0) {
      setCount(0);
      dispatch(removeFromCart(item.id));
    } else {
      setCount(count - 1);
      if (count - 1 > 0) {
        dispatch(updateCart({ itemId: item.id, quantity: count - 1 }));
      }
    }
  };

  const formatPrice = (price) => {
    const formattedPrice = (price / 100).toFixed(2);
    return `$${formattedPrice}`;
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid container sx={styles.container}>
        <Grid item sx={{ width: '100%', height: 140, cursor: 'pointer' }} onClick={handleOpen}>
          <Grid item sx={styles.price}>
            {formatPrice(item.price)}
          </Grid>
          <Grid item sx={styles.productName}>
            {item.name}
          </Grid>
        </Grid>
        <Grid item sx={styles.counter}>
          <IconButton onClick={decrement}>
            <RemoveIcon />
          </IconButton>
          <Grid item sx={styles.numberDisplay}>
            {count}
          </Grid>
          <IconButton onClick={increment}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs' sx={styles.dialog}>
        <DialogContent sx={{ ...styles.dialogContent, display: 'flex', justifyContent: 'center' }}>
          <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
            <Grid item style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <div style={styles.productPicture}></div>
              <div>
                <p style={styles.itemName}>{item.name}</p>
                <div style={styles.description}>
                  <p style={styles.descriptionText}>Description</p>
                </div>
                <p style={styles.dialogPrice}>{`$${(item.price / 100).toFixed(2)} / ${item.units}`}</p>
              </div>
            </Grid>
            <Grid item sx={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
              <div style={styles.counter}>
                <IconButton onClick={decrement} sx={styles.iconButton}>
                  <RemoveIcon />
                </IconButton>
                <Grid item sx={styles.numberDisplay}>
                  {count}
                </Grid>
                <IconButton onClick={increment} sx={styles.iconButton}>
                  <AddIcon />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Product;
