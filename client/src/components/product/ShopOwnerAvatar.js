import React from 'react';

import ImageURLs from '../../images/ImageURLs.json';
import EmbarrassedAvatar from '../../images/avatar_eyebrows.png';

const styles = {
  image: {
    width: 150,
    maxWidth: '35vw',
  },
};

function ShopOwnerAvatar({ embarrassed = false }) {
  const imgSrc = embarrassed ? EmbarrassedAvatar : ImageURLs.SHOP_OWNER;
  return <img src={imgSrc} alt={'Shop Owner'} style={styles.image} />;
}

export default ShopOwnerAvatar;
