import React, { useEffect } from 'react';

import styles from '../styles/pages/Login.json';
import SimpleNavBar from '../components/SimpleNavBar';
import ShopOwnerAvatar from '../components/product/ShopOwnerAvatar';
import SpeechBox from '../components/product/SpeechBox';
import LoginButton from '../components/user/LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import { NODE_BASE_URL } from '../App';

function Login() {
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = NODE_BASE_URL + '/products';
    }
  }, [isAuthenticated]);

  return (
    <div style={styles.login}>
      <SimpleNavBar />
      <div style={styles.avatar}>
        <ShopOwnerAvatar />
      </div>
      <div style={styles.speechBubble}>
        <SpeechBox />
        <p style={styles.welcomeCopy}>WELCOME COPY. WHAT GOES HERE?</p>
      </div>
      <div style={styles.button}>
        <LoginButton />
      </div>
    </div>
  );
}

export default Login;
