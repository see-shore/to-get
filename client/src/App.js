import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Products from './pages/Products';
import OrderConfirmation from './pages/OrderConfirmation';
import Payment from './pages/Payment';
import Admin from './pages/Admin';
import DoesNotExist from './pages/DoesNotExist';
import { store } from './redux/store/store';
import { Provider } from 'react-redux';
import axios from 'axios';
import { Auth0Provider } from '@auth0/auth0-react';
import LoginRoute from './util/LoginRoute';

// CHANGE BOTH TO 'https://ec2-35-89-204-152.us-west-2.compute.amazonaws.com:8080' for prod
export const API_BASE_URL = 'http://localhost:8080';
export const NODE_BASE_URL = 'http://localhost:3000';
axios.defaults.baseURL = API_BASE_URL;

function App() {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: NODE_BASE_URL + '/products',
      }}
      audience={API_BASE_URL}
      useRefreshTokens
      cacheLocation='localstorage'
    >
      <Provider store={store}>
        <div className='background'>
          <Routes>
            <Route exact path='/' element={<LoginRoute />}>
              <Route path='/' element={<Login />} />
            </Route>
            <Route exact path='/login' element={<LoginRoute />}>
              <Route exact path='/login' element={<Login />} />
            </Route>
            <Route path='/products' element={<Products />} />
            <Route path='/admin' element={<Admin />} />

            <Route path='/contact' element={<Contact />} />
            <Route path='/confirm-order' element={<OrderConfirmation />} />
            <Route path='/payment' element={<Payment />} />
            {/* 404 */}
            <Route path='*' element={<DoesNotExist />} />
          </Routes>
        </div>
      </Provider>
    </Auth0Provider>
  );
}

export default App;
