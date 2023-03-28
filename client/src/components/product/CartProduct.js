import React from 'react';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
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
import { selectItemCount } from '../../redux/selectors/selectors';

function CartProduct(props) {
  const dispatch = useDispatch();
  const { item } = props;
  const count = useSelector((state) => selectItemCount(state, item.id));

  const increment = () => {
    dispatch(updateCart({ itemId: item.id, quantity: count + 1, isIncrement: true }));
  };

  const decrement = () => {
    if (count - 1 <= 0) {
      dispatch(removeFromCart(item.id));
    } else {
      if (count - 1 > 0) {
        dispatch(updateCart({ itemId: item.id, quantity: count - 1, isIncrement: false }));
      }
    }
  };

  const handleDelete = () => {
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
          <CircleImage src={item.imageUrl} />
        </ImageContainer>
        <InfoContainer>
          <div>
            <StyledName>{item.name}</StyledName>
            <UnitPrice>
              {formatPrice(item.pricePerUnit)} / {item.units}
            </UnitPrice>
          </div>
          {formatPrice(item.pricePerUnit * count)}
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
