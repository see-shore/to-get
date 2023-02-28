import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getItemsAsync } from '../redux/slices/itemsSlice';

function Products() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.items.items);

  useEffect(() => {
    dispatch(getItemsAsync());
  }, [dispatch]);

  return (
    <div style={{ marginTop: 50 }}>{JSON.stringify(items)}</div>
  );
}

export default Products;
