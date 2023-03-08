import React from 'react';

const styles = {
  image: {
    width: 150
  }
};

function ShopOwnerAvatar() {
  return (
    <img src={'images/shop-owner.png'} alt={"Shop Owner"} style={styles.image} /> // CHANGE THIS
  );
}

export default ShopOwnerAvatar;
