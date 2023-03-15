import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Grid } from '@mui/material';

import { getItemsAsync } from '../redux/slices/itemsSlice';
import styles from '../styles/pages/Products.json';
import ShopOwnerAvatar from '../components/product/ShopOwnerAvatar';
import SpeechBox from '../components/product/SpeechBox';
import UserProfileDialog from '../components/user/UserProfileDialog';
import ProductPanel from '../components/product/ProductPanel';
import CartDialog from '../components/user/CartDialog';
import { setToken } from '../util/AuthUtil';
import Divider from '../images/div-divider.png'; // CHANGE THIS
import { getUserAsync } from '../redux/slices/usersSlice';
import AdminButton from '../components/admin/AdminButton';
import OnlineUsers from '../components/user/OnlineUsers';

function Products() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const accountUser = useSelector((state) => state.users.user);
  const accountName = accountUser.firstName + ' ' + accountUser.lastName;
  const { getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    if (user) {
      dispatch(getUserAsync(user.email));
    }
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(getItemsAsync());
    const getToken = async () => {
      const accessToken = await getAccessTokenSilently();
      setToken(accessToken);
    };
    getToken();
  }, [dispatch, getAccessTokenSilently]);

  const height = Math.ceil(items.length / 2) * 240;
  const WelcomeText = `Welcome to the shop, ${accountUser.firstName}. What would you like to get today?`;

  const isUserAdmin = () => {
    return user.name === 'seeshoreadmin@gmail.com';
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.backgroundCard}>
        <div style={styles.profile}>
          <UserProfileDialog fullName={accountName} firstName={accountUser.firstName} />
        </div>
        {isUserAdmin() && (
          <div style={styles.adminButton}>
            <AdminButton />
          </div>
        )}
        <div style={styles.avatarContainer}>
          <div style={styles.avatar}>
            <ShopOwnerAvatar />
          </div>
          <div style={styles.speechBubble}>
            <SpeechBox text={WelcomeText} />
          </div>
        </div>
        <div style={styles.onlineUsers}>
          <OnlineUsers type={'product'} />
        </div>
      </div>

      <Grid container sx={styles.productsCard}>
        <Grid item sx={styles.divider}>
          <img src={Divider} alt='Divider' style={styles.divider} />
        </Grid>
        <Grid item sx={styles.header}>
          <p style={styles.weekPickCopy}>This Week's Picks</p>
        </Grid>
      </Grid>
      <div style={styles.panel}>
        <ProductPanel items={items} height={height} />
      </div>
      <div style={styles.cartDialog}>
        <CartDialog firstName={accountUser.firstName} userId={accountUser.id} />
      </div>
    </div>
  );
}

export default withAuthenticationRequired(Products);
