import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

import { getStagedItemsAsync } from '../redux/slices/staged/stagedItemsSlice';
import { getStagedVendorsAsync } from '../redux/slices/staged/stagedVendorsSlice';
import { getUsersAsync, setTokenInStore } from '../redux/slices/usersSlice';
import { getOrdersAsync } from '../redux/slices/ordersSlice';
import PanelWrapper from '../components/admin/PanelWrapper';
import VendorsAndItemsPanel from '../components/admin/VendorsAndItemsPanel';
import UsersPanel from '../components/admin/UsersPanel';
import OrdersPanel from '../components/admin/OrdersPanel';
import NavBar from '../components/NavBar';
import { getItemsAsync } from '../redux/slices/itemsSlice';
import OrderMetricsPanel from '../components/admin/OrderMetricsPanel';
import { getMostRecentlySetDeliveryDateAsync } from '../redux/slices/adminSlice';
import { setToken } from '../util/AuthUtil';

function allyProps(index) {
  return {
    id: `admin-tab-${index}`,
    'aria-controls': `admin-tabpanel-${index}`,
  };
}

function Admin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const { getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    const getToken = async () => {
      const accessToken = await getAccessTokenSilently();
      setToken(accessToken);
      dispatch(setTokenInStore(accessToken));
    };
    getToken();
  }, [dispatch, getAccessTokenSilently]);

  useEffect(() => {
    if (user && user.email !== "seeshoreadmin@gmail.com") {
      navigate('/products');
      return;
    }
    dispatch(getStagedItemsAsync());
    dispatch(getStagedVendorsAsync());
    dispatch(getOrdersAsync());
    dispatch(getUsersAsync());
    dispatch(getItemsAsync());
    dispatch(getMostRecentlySetDeliveryDateAsync());
  }, [dispatch, user, navigate]);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <>
      <NavBar />
      <div>
        <Box
          sx={{ marginTop: 15, marginLeft: 5, flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tabIndex}
            onChange={handleTabChange}
            aria-label="Admin tabs"
            sx={{ borderRight: 1, borderColor: 'divider', minHeight: 600 }}
          >
            <Tab label='Vendors & Items' {...allyProps(0)} />
            <Tab label='Total Order' {...allyProps(1)} />
            <Tab label='Order Details' {...allyProps(2)} />
            <Tab label='Users' {...allyProps(3)} />
          </Tabs>
          <PanelWrapper value={tabIndex} index={0}>
            <VendorsAndItemsPanel />
          </PanelWrapper>
          <PanelWrapper value={tabIndex} index={1}>
            <OrderMetricsPanel />
          </PanelWrapper>
          <PanelWrapper value={tabIndex} index={2}>
            <OrdersPanel />
          </PanelWrapper>
          <PanelWrapper value={tabIndex} index={3}>
            <UsersPanel />
          </PanelWrapper>
        </Box>
      </div>
    </>
  );
}

export default withAuthenticationRequired(Admin);
