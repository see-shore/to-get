import React from 'react';
import shopOwnerImage from '../../images/shop-owner.png';

const styles = {
  image: {
    width: 150,
    maxWidth: '35vw',
  },
};

function ShopOwnerAvatar() {
  return <img src={shopOwnerImage} alt={'Shop Owner'} style={styles.image} />;
}

export default ShopOwnerAvatar;
