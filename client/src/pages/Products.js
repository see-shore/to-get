import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getItemsAsync } from '../redux/slices/itemsSlice';
import styles from '../styles/pages/Products.json';
import ShopOwnerAvatar from '../components/product/ShopOwnerAvatar';
import SpeechBox from '../components/product/SpeechBox';
import UserProfileDialog from '../components/user/UserProfileDialog';

function Products() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.items.items);

  useEffect(() => {
    // dispatch(getItemsAsync());
  }, [dispatch]);

  return (
    <div>
      <div style={styles.backgroundCard}>
        <div style={styles.profile}>
          <UserProfileDialog />
          <p style={styles.usernameCopy}>{'Jane Doe'}</p>
        </div>
        <div style={styles.avatar}>
          <ShopOwnerAvatar />
        </div>
        <div style={styles.speechBubble}>
          <SpeechBox />
        </div>
      </div>
      <div style={styles.productsCard}>
        <p style={styles.weekPickCopy}>This week's pick</p>
      </div>
    </div>
    
  );
}

export default Products;
