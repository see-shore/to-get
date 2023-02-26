import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from '../slices/itemsSlice';
import vendorsReducer from '../slices/vendorsSlice';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    vendors: vendorsReducer
  }
});
