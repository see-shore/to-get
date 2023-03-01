import React, { useEffect, useState } from 'react';
import { 
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  Grid,
  Box
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Close as CloseIcon
} from '@mui/icons-material';

import styles from '../../styles/components/CartDialog.json'
import { useSelector } from 'react-redux';
import { selectItemsMap } from '../../redux/selectors/selectors';
import ConfirmOrderButton from './ConfirmOrderButton';

function CartButton() {
  const [open, setOpen] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);
  const cart = useSelector(state => state.items.cart);
  const itemsMap = useSelector(state => selectItemsMap(state));

  useEffect(() => {
    setTotalBalance(0);
    for (const itemId in cart) {
      if (itemsMap[itemId]) {
        const item = itemsMap[itemId];
        const quantity = cart[itemId];
        let orderBalance = quantity * item.price;
        setTotalBalance(prevBalance => prevBalance + orderBalance);
      }
    }
  }, [cart, setTotalBalance, itemsMap]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const generateOrder = (itemId, quantity) => {
    if (itemsMap[itemId]) {
      const item = itemsMap[itemId];
      let orderBalance = quantity * item.price;
      orderBalance = (orderBalance / 100).toFixed(2);
      return (
        <div key={itemId} style={styles.orderLine}>
          <div>
            <p style={styles.orderLineCopy}>{`${quantity}x   ${item.name}`}</p>
          </div>
          <div>
            <p style={styles.orderLineCopy}>{`$${orderBalance}`}</p>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div style={styles.button} onClick={handleOpen}>
        Jane's Cart
        <IconButton sx={{ width: 30, height: 30, marginLeft: 1 }}>
          <ShoppingCartIcon fontSize='large' />
        </IconButton>
      </div>
      <Dialog open={open} onClose={handleClose}  fullWidth maxWidth='xs' sx={styles.dialog}>
        <DialogTitle>
          <Grid sx={styles.dialogTitle}>
            <p style={styles.cartCopy}>Jane's Cart</p>
            <IconButton onClick={handleClose} size='small'>
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <form>
          <DialogContent sx={styles.dialogContent}>
            {Object.keys(cart).map((itemId) => {
              return generateOrder(itemId, cart[itemId]);
            })}
            <div style={styles.totalLine}>
              <div>
                <p style={{...styles.orderLineCopy, marginRight: 10}}>{"Your total is: "}</p>
              </div>
              <div>
                <p style={styles.orderLineCopy}>{`$${(totalBalance / 100).toFixed(2)}`}</p>
              </div>
            </div>
            <div style={styles.deliveryCopy}>
              <p style={styles.orderLineCopy}>Your order will be delivered on</p>
              <p style={{...styles.orderLineCopy, marginTop: 5}}>March 10th.</p>
            </div>
            <div style={styles.orderButton}>
              <ConfirmOrderButton />
            </div>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}

export default CartButton;
