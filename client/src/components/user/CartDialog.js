import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectItemsMap } from '../../redux/selectors/selectors';
import { createOrdersAsync } from '../../redux/slices/ordersSlice';
import { Dialog } from '../../styles/components/CartDialog.styled';
import { DialogContent, DialogTitle, Grid } from '@mui/material';

import CartProduct from '../product/CartProduct';
import ThanksDialog from './ThanksDialog';
import styles from '../../styles/components/CartDialog.json';
import { dateOptions } from '../../util/AppUtil';

function CartButton(props) {
  const [open, setOpen] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);
  const cart = useSelector((state) => state.items.cart);
  const cartCount = useSelector((state) => state.items.cartCount);
  const itemsMap = useSelector((state) => selectItemsMap(state));
  const [isEmpty, setIsEmpty] = useState(true);
  // This is the cart translated into order objects to send to orders endpoint
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const { firstName, userId, ordersPresent } = props;

  const totalText = 'Total Estimate:';
  const deliveryText = 'The delivery is scheduled on';
  const deliveryDate = useSelector((state) => state.admin.deliveryDate);

  useEffect(() => {
    setTotalBalance(0);
    setOrders([]);

    if (cartCount === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      for (const itemId in cart) {
        if (itemsMap[itemId]) {
          const item = itemsMap[itemId];
          const quantity = cart[itemId];
          if (quantity > 0) {
            let orderBalance = quantity * item.pricePerUnit;
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
    }
  }, [cart, setTotalBalance, itemsMap, setIsEmpty, setOrders, userId, cartCount]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const data = { orders, orderTotal: totalBalance };
    dispatch(createOrdersAsync(data));
  };

  const handleUpdate = () => {
    // TODO: method to update order
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
            if (itemsMap[item] && cart[item] > 0) {
              return <CartProduct key={idx} item={itemsMap[item]} />;
            }
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
          <p style={{ marginTop: 5 }}>{new Date(deliveryDate).toLocaleDateString(undefined, dateOptions)}</p>
        </div>
        <div style={styles.orderButton}>
          <ThanksDialog
            isEmpty={isEmpty}
            isEdit={ordersPresent}
            onOrderClick={ordersPresent ? handleUpdate : handleSubmit}
            onClose={handleClose}
          />
        </div>
      </DialogContent>
    );
  };

  return (
    <>
      {!open && (
        // TODO: hide button on ORDER PANEL
        <button className={'styled-button'} style={styles.button} onClick={handleOpen}>
          {!ordersPresent ? `${firstName}'s Cart` : `Edit Order`}
          <span style={styles.itemCount}>{orders.length > 0 && `( ${totalItems(orders)} )`}</span>
        </button>
      )}
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
        {isEmpty ? generateEmptyDialogContent() : generateNonEmptyDialogContent()}
      </Dialog>
    </>
  );
}

export default CartButton;
