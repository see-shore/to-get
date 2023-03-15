import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCart, removeFromCart } from '../../redux/slices/itemsSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { IconButton, Dialog, DialogContent } from '@mui/material';

import styles from '../../styles/components/Product.json';
import dialogStyles from '../../styles/components/CartDialog.json';

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

  const RenderButtons = (style = 'card') => {
    const details = style === 'details' ? true : false;
    const bstyle = {
      card: {
        control: 'control',
        button: 'button',
        countText: 'countText',
      },
      details: {
        control: '',
        button: 'detailsButton',
        countText: 'detailsCountText',
      },
    };
    return (
      <div style={{ ...styles.control, border: !details ? '3px solid #6a5442' : 'none', bottom: !details ? 12 : 16 }}>
        <IconButton
          disabled={!count}
          onClick={decrement}
          size={'large'}
          style={{ ...styles[bstyle[style].button], borderRight: !details ? '3px dashed #6a5442bd' : 'none' }}
        >
          <FontAwesomeIcon icon={solid('minus')} />
        </IconButton>
        <p style={styles[bstyle[style].countText]}>{count}</p>
        <IconButton
          onClick={increment}
          size={'large'}
          style={{ ...styles[bstyle[style].button], borderLeft: !details ? '3px dashed #6a5442bd' : 'none' }}
        >
          <FontAwesomeIcon icon={solid('plus')} />
        </IconButton>
      </div>
    );
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
            <p style={styles.priceText}>{formatPrice(item.pricePerUnit)}</p>
            <p style={styles.priceUnit}>{'/unit'}</p>
          </div>
          <div style={styles.crate}>
            <div style={styles.imageContainer}>
              <img style={styles.image} src={item.imageUrl} alt="to.get Item" />
            </div>
            <div style={styles.textContainer}>
              <p style={styles.itemName}>{item.name}</p>
            </div>
          </div>
        </div>
        {RenderButtons('card')}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='xs'
        sx={styles.dialog}
        PaperProps={dialogStyles.paperStyle}
      >
        <DialogContent sx={{ ...styles.dialogContent, display: 'flex', justifyContent: 'center' }}>
          <div style={styles.headerContainer}>
            <div style={styles.headerLeft}>
              <p style={styles.dialogItemName}>{item.name}</p>
              <p style={styles.dialogUnitPrice}>{`$${(item.price / 100).toFixed(2)} / ${item.units}`}</p>
            </div>
            <p style={styles.dialogTotalPrice}>{!count ? '$0' : `$${((item.pricePerUnit * count) / 100).toFixed(2)}`}</p>
          </div>
          <div style={styles.detailsImageContainer}>
            <img style={styles.detailsImage} src={item.imageUrl} alt="to.get Item" />
          </div>
          <div style={{ ...styles.descriptionContainer, 
            display: (item.description && item.description.length > 0) ? 'block' : 'none' }}>
            <p style={styles.descriptionHeader}>Description</p>
            <p style={styles.descriptionText}>{item.description}</p>
          </div>
          {RenderButtons('details')}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Product;
