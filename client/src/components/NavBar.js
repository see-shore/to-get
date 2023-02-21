import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

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
`;

const StyledNavLink = styled.div`
  display: flex;
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 1px;
  gap: 2em;
`;

const StyledLogo = styled.img`
  height: 3em;
`;

const StyledIcons = styled(FontAwesomeIcon)`
  color: white;
  height: 22px;
`;

function NavBar() {
  return (
    <StyledNavBar>
      <Link to='/'>
        <StyledLogo src={'/logo192.png'} />
      </Link>
      <StyledNavLink>
        <Link to='#'>
          <StyledIcons icon={solid('magnifying-glass')} />
        </Link>
        <Link to='/login'>
          <StyledIcons icon={solid('user')} />
        </Link>
        <Link to='/confirm-order'>
          <StyledIcons icon={solid('bag-shopping')} />
        </Link>
      </StyledNavLink>
    </StyledNavBar>
  );
}

export default NavBar;
