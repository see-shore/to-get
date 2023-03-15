import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, Outlet } from 'react-router-dom';

function LoginRoute() {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated 
    ? <Navigate to='/' />
    : <Outlet />
}

export default LoginRoute;
