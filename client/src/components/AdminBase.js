import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import OrderTotal from '../pages/admin/OrderTotal';
import OrderUser from '../pages/admin/OrderUser';
import SetPrice from '../pages/admin/SetPrice';
import { getItemsAsync } from '../redux/slices/itemsSlice';

const StyledSideBar = styled.div`
  height: 100%;
  width: 26em;
  position: fixed;
  top: 0;
  left: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding-top: 14vh;

  & button {
    padding: 0.5em 0;
    background: transparent;
    border: none;
  }
`;

const StyledButton = styled.button`
  font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
`;

const PageContainer = styled.div``;

function AdminBase() {
  const dispatch = useDispatch();
  const [currPage, setCurrPage] = useState('set-price');

  React.useEffect(() => {
    dispatch(getItemsAsync());
  }, [dispatch]);

  const handleClick = (type) => {
    setCurrPage(type);
  };

  return (
    <div>
      <a className='tempPageSign'>Temp Set Order wrt to User</a>
      <StyledSideBar>
        <ButtonContainer>
          {console.log('same', currPage && 'set-price')}
          <StyledButton onClick={() => handleClick('set-price')} isActive={currPage === 'set-price'}>
            Set Price
          </StyledButton>
          <StyledButton onClick={() => handleClick('orders')} isActive={currPage === 'orders'}>
            Orders
          </StyledButton>
          <StyledButton onClick={() => handleClick('users')} isActive={currPage === 'users'}>
            Users
          </StyledButton>
        </ButtonContainer>
      </StyledSideBar>
      <PageContainer>
        {currPage === 'set-price' && <SetPrice />}
        {currPage === 'orders' && <OrderTotal />}
        {currPage === 'user' && <OrderUser />}
      </PageContainer>
    </div>
  );
}
export default AdminBase;
