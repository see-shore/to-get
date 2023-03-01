import React, { useState } from 'react';

import styles from '../../styles/components/CartDialog.json'

function CartButton() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  return (
    <div style={styles.button}>
      Your cart
    </div>
  );
}

export default CartButton;
