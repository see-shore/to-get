import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

import styles from '../../styles/components/LoginButton.json';

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <p style={styles.hintCopy}>Please sign in to continue</p>
      <div style={styles.button} onClick={() => loginWithRedirect()}>
        <p style={styles.loginCopy}>Log In</p>
      </div>
    </div>
  );
}

export default LoginButton;
