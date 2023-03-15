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

function createData(id, name, price, units, pricePerUnit, 
      description, addedDate, available, imageUrl) {
  const formattedDate = new Date(addedDate);
  const formattedPrice = (price / 100).toFixed(2);
  const formattedPricePerUnit = (pricePerUnit / 100).toFixed(2);
  return { id, name, price, units, pricePerUnit, description, formattedPrice, 
    formattedPricePerUnit, formattedDate, available, imageUrl };
}

function VendorTable(props) {
  const rows = [];
  const { items, vendor } = props;

  if (items) {
    items.forEach((item) => {
      rows.push(
        createData(
          item.id, 
          item.name, 
          item.price, 
          item.units, 
          item.pricePerUnit,
          item.description,
          item.addedDate, 
          item.available,
          item.imageUrl
        )
      )
    });
  }
  

  return (
    <Box sx={styles.table}>
      <Toolbar sx={styles.toolbar} variant='dense'>
        <Grid container sx={styles.toolbarGrid}>
          <Grid item sx={styles.vendorTitle}>
            <p style={{ fontFamily: 'helvetica', fontSize: 12, fontWeight: 'bold' }}>
              {vendor.name}
            </p>
            <p style={{ marginLeft: 10, fontFamily: 'helvetica', fontSize: 13 }}>
              {vendor.phone}
            </p>
            <p style={{ marginLeft: 10, fontFamily: 'helvetica', fontSize: 13 }}>
              {vendor.website}
            </p>
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
              <TableCell><h4>Units</h4></TableCell>
              <TableCell>
                <h4>Individual Price</h4> 
                <h4>($ / Indiv. Item)</h4>
              </TableCell>
              <TableCell><h4>Description</h4></TableCell>
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
