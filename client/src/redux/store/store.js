import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from '../slices/itemsSlice';
import vendorsReducer from '../slices/vendorsSlice';
import ordersReducer from '../slices/ordersSlice';
import stagedItemsReducer from '../slices/staged/stagedItemsSlice';
import stagedVendorsReducer from '../slices/staged/stagedVendorsSlice';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    vendors: vendorsReducer,
    orders: ordersReducer,
    stagedItems: stagedItemsReducer,
    stagedVendors: stagedVendorsReducer
  }
});
