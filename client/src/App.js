import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Login from './pages/Login';
import OrderConfirmation from './pages/OrderConfirmation';
import Payment from './pages/Payment';
import SetPrice from './pages/SetPrice';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/confirm-order' element={<OrderConfirmation />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/set-price' element={<SetPrice />} />
      </Routes>
    </div>
  );
}

export default App;
