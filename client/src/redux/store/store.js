import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from '../slices/itemsSlice';

export const store = configureStore({
  reducer: {
    items: itemsReducer
  }
});
