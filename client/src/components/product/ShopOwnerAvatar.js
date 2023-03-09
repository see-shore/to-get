import React from 'react';

import ShopOwner from '../../images/shop-owner.png';

const styles = {
  image: {
    width: 150
  }
};

function ShopOwnerAvatar() {
  return (
    <img src={ShopOwner} alt={"Shop Owner"} style={styles.image} /> // CHANGE THIS
  );
}

export default ShopOwnerAvatar;
