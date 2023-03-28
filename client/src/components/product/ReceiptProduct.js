import React from 'react';

import {
  ItemContainer,
  ImageContainer,
  InfoContainer,
  StyledName,
  UnitPrice,
  CircleImage,
} from '../../styles/components/CartProduct.styled';
import styles from '../../styles/components/ReceiptProduct.json';

function ReceiptProduct(props) {
  const { item, order } = props;

  const formatPrice = (price) => {
    const formattedPrice = (price / 100).toFixed(2);
    return `$${formattedPrice}`;
  };

  return (
    <>
      <ItemContainer>
        <ImageContainer>
          <CircleImage src={item.imageUrl} />
        </ImageContainer>
        <InfoContainer>
          <div>
            <StyledName>{item.name}</StyledName>
            <UnitPrice>
              {formatPrice(item.pricePerUnit)} / {item.units}
            </UnitPrice>
          </div>
          {formatPrice(item.pricePerUnit * order.quantity)}
        </InfoContainer>
        <div style={styles.quantity}>
          <p>{order.quantity}</p>
        </div>
      </ItemContainer>
    </>
  );
}

export default ReceiptProduct;
