import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
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
        <div className='App'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/products' element={<Products />} />
            <Route path='/confirm-order' element={<OrderConfirmation />} />
            <Route path='/payment' element={<Payment />} />
            {/* Admin Pages */}
            <Route path='/admin' element={<Admin />} />
            {/* 404 */}
            <Route path='*' element={<DoesNotExist />} />
          </Routes>
        </div>
      </Provider>
    </Auth0Provider>
  );
}

export default App;
