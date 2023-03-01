import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import Products from './pages/Products';
import OrderConfirmation from './pages/OrderConfirmation';
import Payment from './pages/Payment';
import Admin from './pages/Admin';
import DoesNotExist from './pages/DoesNotExist';
import { store } from './redux/store/store';
import { Provider } from 'react-redux';
import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';
axios.defaults.baseURL = BASE_URL;

function App() {
  return (
    <Provider store={store}>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create-account' element={<CreateAccount />} />
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
  );
}

export default App;
