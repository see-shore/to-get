import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

import { getItemsAsync } from '../redux/slices/itemsSlice';
import styles from '../styles/pages/Products.json';
import ShopOwnerAvatar from '../components/product/ShopOwnerAvatar';
import SpeechBox from '../components/product/SpeechBox';
import UserProfileDialog from '../components/user/UserProfileDialog';
import ProductPanel from '../components/product/ProductPanel';
import CartDialog from '../components/user/CartDialog';
import { setToken } from '../util/AuthUtil';
import ThanksModal from '../components/user/ThanksDialog';

function Products() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.items.items);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    dispatch(getItemsAsync());
    const getToken = async () => {
      const accessToken = await getAccessTokenSilently();
      setToken(accessToken);
    };
    getToken();
  }, [dispatch, getAccessTokenSilently]);

  const height = Math.ceil(items.length / 2) * 220;

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
        <p style={styles.weekPickCopy}>This week's picks</p>
      </div>
      <div style={styles.panel}>
        <ProductPanel items={items} height={height} />
      </div>
      <CartDialog />
    </div>
    
  );
}

export default withAuthenticationRequired(Products);
