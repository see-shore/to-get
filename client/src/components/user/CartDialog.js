import React, { useEffect, useState } from 'react';
import {
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';

import styles from '../../styles/components/CartDialog.json'
import { useDispatch, useSelector } from 'react-redux';
import { selectItemsMap } from '../../redux/selectors/selectors';
import { createOrdersAsync } from '../../redux/slices/ordersSlice';
import ThanksDialog from './ThanksDialog';

function CartButton(props) {
  const [open, setOpen] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);
  const cart = useSelector(state => state.items.cart);
  const itemsMap = useSelector(state => selectItemsMap(state));
  const [isEmpty, setIsEmpty] = useState(true);
  // This is the cart translated into order objects to send to orders endpoint
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const { firstName } = props;

  useEffect(() => {
    setTotalBalance(0);
    setOrders([]);

    if (Object.keys(cart).length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      for (const itemId in cart) {
        if (itemsMap[itemId]) {
          const item = itemsMap[itemId];
          const quantity = cart[itemId];
          let orderBalance = quantity * item.price;
          setTotalBalance(prevBalance => prevBalance + orderBalance);

          const newOrder = {
            itemId,
            userId: 1, // CHANGE THIS!!!
            quantity
          };
          setOrders(prevState => [...prevState, newOrder]);
        }
      }
    }
  }, [cart, setTotalBalance, itemsMap, setIsEmpty, setOrders]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    dispatch(createOrdersAsync(orders));
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

  const generateEmptyDialogContent = () => {
    return (
      <DialogContent sx={styles.emptyDialogContent}>
        <div>
          <p style={styles.orderLineCopy}>Your cart is empty! Please select</p>
          <p style={{ ...styles.orderLineCopy, marginTop: 5 }}>an item to continue.</p>
        </div>
        <div
          onClick={handleClose}
          style={{ ...styles.orderButton, marginBottom: 10, marginTop: 30 }}
        >
          <ThanksDialog isEmpty={isEmpty} />
        </div>
      </DialogContent>
    );
  };

  const generateNonEmptyDialogContent = () => {
    return (
      <DialogContent sx={styles.dialogContent}>
        {Object.keys(cart).map((itemId) => {
          return generateOrder(itemId, cart[itemId]);
        })}
        <div style={styles.totalLine}>
          <div>
            <p style={{ ...styles.orderLineCopy, marginRight: 10 }}>{"Your total is: "}</p>
          </div>
          <div>
            <p style={styles.orderLineCopy}>{`$${(totalBalance / 100).toFixed(2)}`}</p>
          </div>
        </div>
        <div style={styles.deliveryCopy}>
          <p style={styles.orderLineCopy}>Your order will be delivered on</p>
          <p style={{ ...styles.orderLineCopy, marginTop: 5 }}>March 10th.</p>
        </div>
        <div style={styles.orderButton}>
          <ThanksDialog 
            isEmpty={isEmpty} 
            onOrderClick={handleSubmit} 
            onClose={handleClose} />
        </div>
      </DialogContent>
    );
  };

  return (
    <>
      <div style={styles.button} onClick={handleOpen}>
        {firstName}'s Cart
        <IconButton sx={{ width: 30, height: 30, marginLeft: 1, color: "#FFFFFF" }}>
          <ShoppingCartIcon fontSize='large' />
        </IconButton>
      </div>
      <Dialog open={open} onClose={handleClose} maxWidth='xs' sx={styles.dialog}>
        <DialogTitle>
          <Grid sx={styles.dialogTitle}>
            <p style={styles.cartCopy}>{firstName}'s Cart</p>
          </Grid>
        </DialogTitle>
        <form>
          {isEmpty ?
            generateEmptyDialogContent() : generateNonEmptyDialogContent()}
        </form>
      </Dialog>
    </>
  );
}

export default CartButton;
