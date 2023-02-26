import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from '../slices/itemsSlice';
import vendorsReducer from '../slices/vendorsSlice';
import ordersReducer from '../slices/ordersSlice'; 

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    vendors: vendorsReducer,
    orders: ordersReducer
  }
});
