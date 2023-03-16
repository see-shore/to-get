import React from 'react';

import ImageURLs from '../../images/ImageURLs.json';

const styles = {
  image: {
    width: 150,
    maxWidth: '35vw',
  },
};

function ShopOwnerAvatar() {
  return (
    <img src={ImageURLs.SHOP_OWNER} alt={'Shop Owner'} style={styles.image} />
  );
}

export default ShopOwnerAvatar;
