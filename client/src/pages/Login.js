import React from 'react';

import styles from '../styles/pages/Login.json';
import SimpleNavBar from '../components/SimpleNavBar';
import ShopOwnerAvatar from '../components/product/ShopOwnerAvatar';
import SpeechBox from '../components/product/SpeechBox';
import LoginButton from '../components/user/LoginButton';

function Login() {
  return (
    <div style={styles.login}>
      <SimpleNavBar />
      <div style={styles.avatar}>
        <ShopOwnerAvatar />
      </div>
      <div style={styles.speechBubble}>
        <SpeechBox />
      </div>
      <div style={styles.button}>
        <LoginButton />
      </div>
    </div>
  );
}

export default Login;
