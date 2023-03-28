import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import styles from '../../styles/components/LoginButton.json';

function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  return (
    <button className={'styled-button'} style={styles.button} onClick={() => loginWithRedirect()}>
      <p style={styles.loginCopy}>Login</p>
    </button>
  );
}

export default LoginButton;
