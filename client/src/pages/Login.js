import React, { useEffect } from 'react';

import styles from '../styles/pages/Login.json';
import ShopOwnerAvatar from '../components/product/ShopOwnerAvatar';
import SpeechBox from '../components/product/SpeechBox';
import LoginButton from '../components/user/LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import { NODE_BASE_URL } from '../App';
import useWindowWidth from '../hooks/useWindowWidth';

function Login() {
  const { isAuthenticated } = useAuth0();
  const width = useWindowWidth();

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = NODE_BASE_URL + '/products';
    }
  }, [isAuthenticated]);

  const BubbleText = 'Welcome to the shop. What would you like to get today?';
  const HeadingText = 'Welcome!';
  const IntroText = 'We are dedicated to minimizing the consumption of plastic in every delivery we make.';
  return (
    <div
      className={'page background'}
      style={{
        ...styles.login,
        backgroundColor: width > 1024 ? 'white' : 'rgba(255, 255, 255, 0.75)',
        paddingLeft: width > 1024 ? '5em' : 0,
      }}
    >
      <div style={styles.topContainer}>
        <div style={styles.avatar}>
          <ShopOwnerAvatar />
        </div>
        <div style={styles.speechBubble}>
          <SpeechBox text={BubbleText} />
        </div>
      </div>
      <div style={styles.bottomContainer}>
        <h1 style={styles.header}>{HeadingText}</h1>
        <p style={styles.paragraph}>{IntroText}</p>
        <div style={styles.buttonContainer}>
          <LoginButton />
        </div>
      </div>
    </div>
  );
}

export default Login;
