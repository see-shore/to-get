import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavBar = styled.header`
  background: #abe5c2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 8vh;
  padding: 0 4em;
`;

const StyledNavLink = styled.div`
  display: flex;
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 1px;
  gap: 1.5em;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const StyledLogo = styled.img`
  height: 3em;
`;

function NavBar() {
  return (
    <StyledNavBar>
      <Link to='/'>
        <StyledLogo src={'/logo192.png'} />
      </Link>
      <StyledNavLink>
        <StyledLink to='/contact'>Contact</StyledLink>
      </StyledNavLink>
    </StyledNavBar>
  );
}

export default NavBar;
