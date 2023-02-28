import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Toolbar,
  Grid
} from '@mui/material';

import VendorTableRow from './VendorTableRow';
import AddItemDialog from './AddItemDialog';
import styles from '../../styles/components/VendorTable.json';
import EditVendorDialog from './EditVendorDialog';

function createData(id, name, price, addedDate, available) {
  const formattedDate = new Date(addedDate);
  const formattedPrice = (price / 100).toFixed(2);
  return { id, name, price, formattedPrice, formattedDate, available };
}

function VendorTable(props) {
  const rows = [];
  const { items, vendor } = props;

  if (items) {
    items.forEach((item) => {
      rows.push(createData(item.id, item.name, item.price, item.addedDate, item.available))
    });
  }
  

  return (
    <Box sx={styles.table}>
      <Toolbar sx={styles.toolbar} variant='dense'>
        <Grid container sx={styles.toolbarGrid}>
          <Grid item sx={styles.vendorTitle}>
            <h3>
              {vendor.name}
            </h3>
            <h3 style={{ marginLeft: 10 }}>
              {vendor.phone}
            </h3>
            <h3 style={{ marginLeft: 10 }}>
              {vendor.website}
            </h3>
          </Grid>
          <Grid item>
            <EditVendorDialog vendor={vendor} />
            <AddItemDialog vendor={vendor} />
          </Grid>
        </Grid>
      </Toolbar>
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow sx={styles.header}>
              <TableCell><h4>ID</h4></TableCell>
              <TableCell><h4>Name</h4></TableCell>
              <TableCell><h4>Price</h4></TableCell>
              <TableCell> <h4>Added on</h4></TableCell>
              <TableCell><h4>Available</h4></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <VendorTableRow key={row.id} row={row} vendor={vendor} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default VendorTable;
