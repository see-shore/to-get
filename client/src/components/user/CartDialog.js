import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectItemsMap } from '../../redux/selectors/selectors';
import { createOrdersAsync } from '../../redux/slices/ordersSlice';
import { Dialog } from '../../styles/components/CartDialog.styled';
import { IconButton, DialogContent, DialogTitle, Grid } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';

import CartProduct from '../product/CartProduct';
import ThanksDialog from './ThanksDialog';
import styles from '../../styles/components/CartDialog.json';

function CartButton(props) {
  const [open, setOpen] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);
  const cart = useSelector((state) => state.items.cart);
  const itemsMap = useSelector((state) => selectItemsMap(state));
  const [isEmpty, setIsEmpty] = useState(true);
  // This is the cart translated into order objects to send to orders endpoint
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const { firstName, userId } = props;

  const totalText = 'Total Estimate:';
  const deliveryText = 'The delivery scheduled on';
  const deliveryDate = 'March 10th';

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
          setTotalBalance((prevBalance) => prevBalance + orderBalance);

          const newOrder = {
            itemId,
            userId,
            quantity,
          };
          setOrders((prevState) => [...prevState, newOrder]);
        }
      }
    }
  }, [cart, setTotalBalance, itemsMap, setIsEmpty, setOrders, userId]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    dispatch(createOrdersAsync(orders));
  };
  const checkCartCache = (itemId) => {
    if (itemId in cart) {
      return cart[itemId];
    }
    return 0;
  };

  const totalItems = (itemList) => itemList.reduce((total, curr) => total + curr.quantity, 0);

  const generateEmptyDialogContent = () => {
    return (
      <DialogContent sx={styles.emptyDialogContent}>
        <div style={{ ...styles.textCopy, textAlign: 'center' }}>
          <p>Your cart is empty! Please select</p>
          <p style={{ marginTop: 5 }}>an item to continue.</p>
        </div>
        <div onClick={handleClose} style={{ ...styles.orderButton, marginTop: '2em' }}>
          <ThanksDialog isEmpty={isEmpty} />
        </div>
      </DialogContent>
    );
  };

  const generateNonEmptyDialogContent = () => {
    return (
      <DialogContent sx={styles.dialogContent}>
        <div style={styles.itemContainer}>
          {Object.keys(cart).map((item, idx) => {
            return <CartProduct key={idx} item={itemsMap[item]} defaultN={checkCartCache(item)} />;
          })}
        </div>
        <div style={styles.totalLine}>
          <div>
            <p style={{ marginRight: 10 }}>{totalText}</p>
          </div>
          <div>
            <p>{`$${(totalBalance / 100).toFixed(2)}`}</p>
          </div>
        </div>
        <div style={styles.textCopy}>
          <p>{deliveryText}</p>
          <p style={{ marginTop: 5 }}>{deliveryDate}</p>
        </div>
        <div style={styles.orderButton}>
          <ThanksDialog isEmpty={isEmpty} onOrderClick={handleSubmit} onClose={handleClose} />
        </div>
      </DialogContent>
    );
  };

  return (
    <>
      <button style={styles.button} onClick={handleOpen}>
        {/* <span style={styles.icon}>
          <ShoppingCartIcon fontSize='large' />
        </span> */}
        {firstName}'s Cart
        <span style={styles.itemCount}>{orders.length > 0 && `( ${totalItems(orders)} )`}</span>
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='xs'
        xs={styles.dialog}
        PaperProps={styles.paperStyle}
      >
        <DialogTitle sx={styles.title}>
          <Grid sx={styles.dialogTitle}>
            <p style={styles.cartCopy}>{firstName}'s Cart</p>
          </Grid>
        </DialogTitle>
        <form>{isEmpty ? generateEmptyDialogContent() : generateNonEmptyDialogContent()}</form>
      </Dialog>
    </>
  );
}

export default CartButton;
