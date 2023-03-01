import React, { useState } from 'react';
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

function CartButton() {
  const [open, setOpen] = useState(false);
  const cart = useSelector(state => state.items.cart);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            {JSON.stringify(cart)}
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}

export default CartButton;
