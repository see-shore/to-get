import React from 'react';
import { useSelector } from 'react-redux';
import { selectStagedVendorsMap, selectStagedItemsMap } from '../../redux/selectors/selectors';
import Box from '@mui/material/Box';

import VendorTable from './VendorTable';

function VendorsAndItemsPanel() {
  const stagedVendors = useSelector((state) => state.stagedVendors.stagedVendors);
  const stagedItems = useSelector((state) => state.stagedItems.stagedItems);
  
  // Custom map { stagedVendorId: stagedVendor }
  const stagedVendorsMap = useSelector((state) => selectStagedVendorsMap(state));
  // Custom map { stagedVendorId: [stagedItem] }
  const stagedItemsMap = useSelector((state) => selectStagedItemsMap(state));

  return (
    <>{stagedVendors.map((vendor) => {
      return (
        <Box key={vendor.id}>
          <VendorTable items={stagedItemsMap[vendor.id]} vendor={vendor} />
        </Box>
      );
    })}</>
  );
}

export default VendorsAndItemsPanel;
