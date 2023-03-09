import React, { useEffect, useState } from 'react';
import { IconButton, Grid, Dialog, DialogContent } from '@mui/material';
import { Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useDispatch } from 'react-redux';

import { updateCart, removeFromCart } from '../../redux/slices/itemsSlice';
import styles from '../../styles/components/Product.json';

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
      <div style={styles.container}>
        <div onClick={handleOpen} style={styles.box}>
          <div style={styles.priceTag}>
            <p style={styles.priceText}>{formatPrice(item.price)}</p>
            <p style={styles.priceUnit}>{'/unit'}</p>
          </div>
          <div style={styles.crate}>
            <img style={styles.imageContainer} src={require(`../../images/produce/real_${item.id}.png`)} />
            <div style={styles.textContainer}>
              <p style={styles.itemName}>{item.name}</p>
              <p style={styles.itemType}>{'golden'}</p>
            </div>
          </div>
        </div>
        <div style={styles.control}>
          <IconButton
            onClick={decrement}
            size={'large'}
            style={{ ...styles.button, borderRight: '3px dashed #6a5442bd' }}
          >
            <FontAwesomeIcon icon={solid('minus')} />
          </IconButton>
          <p style={styles.countText}>{count}</p>
          <IconButton
            onClick={increment}
            size={'large'}
            style={{ ...styles.button, borderLeft: '3px dashed #6a5442bd' }}
          >
            <FontAwesomeIcon icon={solid('plus')} />
          </IconButton>
        </div>
      </div>
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
                <p style={styles.dialogPrice}>{`$${(item.price / 100).toFixed(2)}`}</p>
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
