import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Button, StyledText, TextContainer } from '../../styles/components/ProductButton.styled';

function ProductButton(props) {
  const { back, product } = props;
  const handleClick = () => {
    props.onClick((prevState) => !prevState);
  };
  console.log('type', product);
  return (
    <Button className={'styled-button'} onClick={handleClick}>
      <FontAwesomeIcon icon={regular('lemon')} />
      <TextContainer>
        {product ? (
          <>
            {back ? 'back' : 'return'} to <StyledText>products</StyledText>
          </>
        ) : (
          <>
            view <StyledText>Order</StyledText>
          </>
        )}
      </TextContainer>
    </Button>
  );
}

export default ProductButton;
