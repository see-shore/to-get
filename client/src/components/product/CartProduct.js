import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateCart, removeFromCart } from '../../redux/slices/itemsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import {
  ItemContainer,
  ImageContainer,
  InfoContainer,
  ButtonContainer,
  ItemControl,
  StyledName,
  UnitPrice,
  CircleImage,
  ItemCount,
} from '../../styles/components/CartProduct.styled';

function CartProduct(props) {
  const dispatch = useDispatch();
  const [count, setCount] = useState(props.defaultN);
  const { item } = props;

  const increment = () => {
    setCount(count + 1);
    dispatch(updateCart({ itemId: item.id, quantity: count + 1 }));
  };

  const decrement = () => {
    if (count - 1 <= 0) {
      setCount(0);
      dispatch(removeFromCart(item.id));
    } else {
      setCount(count - 1);
      if (count - 1 > 0) {
        dispatch(updateCart({ itemId: item.id, quantity: count - 1 }));
      }
    }
  };

  const handleDelete = () => {
    setCount(0);
    dispatch(removeFromCart(item.id));
  };

  const formatPrice = (price) => {
    const formattedPrice = (price / 100).toFixed(2);
    return `$${formattedPrice}`;
  };

  return (
    <>
      <ItemContainer>
        <ImageContainer>
          <CircleImage src={require(`../../images/produce/real_${item.id}.png`)} />
        </ImageContainer>
        <InfoContainer>
          <div>
            <StyledName>{item.name}</StyledName>
            <UnitPrice>
              {formatPrice(item.price)}/{'unit'}
            </UnitPrice>
          </div>
          {formatPrice(item.price * count)}
        </InfoContainer>
        <ButtonContainer>
          <IconButton onClick={handleDelete}>
            <FontAwesomeIcon icon={solid('x')} />
          </IconButton>
          <ItemControl>
            <IconButton onClick={decrement}>
              <FontAwesomeIcon icon={solid('minus')} />
            </IconButton>
            <ItemCount>{count}</ItemCount>
            <IconButton onClick={increment}>
              <FontAwesomeIcon icon={solid('plus')} />
            </IconButton>
          </ItemControl>
        </ButtonContainer>
      </ItemContainer>
    </>
  );
}

export default CartProduct;
