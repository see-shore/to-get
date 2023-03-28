import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Button, StyledText, TextContainer } from '../../styles/components/ProductButton.styled';

function ProductButton({ back = true }) {
  return (
    <Button className={'styled-button'}>
      <FontAwesomeIcon icon={regular('lemon')} />
      <TextContainer>
        {back ? 'back' : 'return'} to <StyledText>PRODUCTS</StyledText>
      </TextContainer>
    </Button>
  );
}

export default ProductButton;
