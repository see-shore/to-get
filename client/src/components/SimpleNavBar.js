import React from 'react';
import styled from 'styled-components';

// For prod don't import img, just provide src={'images/X.png'}
// And put image X.png in src/main/resources
import AppLogo from '../images/logo192.png';
import TextLogo from '../images/app-logo.png';

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
      <StyledLogo src={AppLogo} /> 
      <img src={TextLogo} alt="App Logo" style={{ height: 30, marginTop: 10 }} />
    </StyledNavBar>
  );
}

export default SimpleNavBar;
