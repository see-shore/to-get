import React from 'react';
import styled from 'styled-components';

const StyledNavBar = styled.header`
  background: #abe5c2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 8vh;
  padding: 0 4em;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
`;

const StyledLogo = styled.img`
  height: 3em;
`;

function SimpleNavBar() {
  return (
    <StyledNavBar>
      <StyledLogo src={'/logo192.png'} />
    </StyledNavBar>
  );
}

export default SimpleNavBar;
