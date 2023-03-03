import React from 'react';

import styles from '../../styles/components/CartDialogButton.json';

function CartDialogButton(props) {
  const { isEmpty } = props;
  const buttonCopy = isEmpty ? "Continue Shopping" : "Confirm Order";
  return (
    <div style={styles.button}>
      <p style={styles.buttonText}>{buttonCopy}</p>
    </div>
  );
}

export default CartDialogButton;
