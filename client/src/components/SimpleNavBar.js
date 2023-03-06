import React from 'react';
import styled from 'styled-components';

import AppLogo from '../images/app-logo.png';

const StyledNavBar = styled.header`
  background: #abe5c2;
  display: flex;
  justify-content: left;
  align-items: center;
  height: 8vh;
  padding: 0 4em;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
`;

const StyledLogo = styled.img`
  height: 4em;
  margin-left: -10px;
`;

function SimpleNavBar() {
  return (
    <StyledNavBar>
      <StyledLogo src={'/logo192.png'} />
      <img src={AppLogo} alt="App Logo" style={{ height: 30, marginTop: 10 }} />
    </StyledNavBar>
  );
}

export default SimpleNavBar;
