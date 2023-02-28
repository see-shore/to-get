import React from 'react';
import { useSelector } from 'react-redux';
import { selectStagedItemsMap } from '../../redux/selectors/selectors';
import Box from '@mui/material/Box';

import VendorTable from './VendorTable';
import AddVendorDialog from './AddVendorDialog';
import { Grid } from '@mui/material';
import styles from '../../styles/components/VendorsAndItemsPanel.json';

function VendorsAndItemsPanel() {
  const stagedVendors = useSelector((state) => state.stagedVendors.stagedVendors);
  // Custom map { stagedVendorId: [stagedItem] }
  const stagedItemsMap = useSelector((state) => selectStagedItemsMap(state));

  return (
    <Grid container>
      <Grid item>
        {stagedVendors.map((vendor) => {
          return (
            <Box key={vendor.id}>
              <VendorTable items={stagedItemsMap[vendor.id]} vendor={vendor} />
            </Box>
          );
        })}
      </Grid>
      <Grid item sx={styles.buttonGrid}>
        <AddVendorDialog />
      </Grid>
    </Grid>
  );
}

export default VendorsAndItemsPanel;
