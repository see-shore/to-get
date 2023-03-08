import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextLogo from '../images/app-logo.png';
import { Button } from '@mui/material';
import {
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useAuth0 } from '@auth0/auth0-react';
import { NODE_BASE_URL } from '../App';

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

const StyledNavLink = styled.div`
  display: flex;
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 1px;
  gap: 2em;
`;

const StyledLogo = styled.img`
  height: 4em;
  margin-left: -10px;
`;

const StyledIcons = styled(FontAwesomeIcon)`
  color: white;
  height: 22px;
`;

function NavBar() {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ 
      logoutParams: { returnTo: (NODE_BASE_URL+ '/login') } 
    });
  };

  return (
    <StyledNavBar>
      <Link to='/'>
        <StyledLogo src={'images/logo192.png'} />
        <img src={TextLogo} alt="Text Logo" style={{ height: 35, marginTop: 10 }} />
      </Link>
      <Button 
              onClick={() => handleLogout()} 
              sx={{ color:'#FFFFFF', backgroundColor: '#ef5350' }} 
              type='submit'
            >
              <LogoutIcon sx={{ margin: "auto 5px auto 5px" }} />Log out
            </Button>
      {/* <StyledNavLink>
        <Link to='#'>
          <StyledIcons icon={solid('magnifying-glass')} />
        </Link>
        <Link to='/login'>
          <StyledIcons icon={solid('user')} />
        </Link>
        <Link to='/confirm-order'>
          <StyledIcons icon={solid('bag-shopping')} />
        </Link>
      </StyledNavLink> */}
    </StyledNavBar>
  );
}

export default NavBar;
