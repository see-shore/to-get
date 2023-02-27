import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Toolbar
} from '@mui/material';

import VendorTableRow from './VendorTableRow';
import styles from '../../styles/components/VendorTable.json';

function createData(id, name, price, addedDate, available) {
  const formattedDate = new Date(addedDate);
  const formattedPrice = (price / 100).toFixed(2);
  return { id, name, price, formattedPrice, formattedDate, available };
}

function VendorTable(props) {
  const rows = [];
  const { items, vendor } = props;

  items.forEach((item) => {
    rows.push(createData(item.id, item.name, item.price, item.addedDate, item.available))
  });

  return (
    <Box sx={styles.table}>
      <Toolbar sx={styles.toolbar} variant='dense'>
        <Typography variant='h6'>
          {vendor.name}
        </Typography>
        <Typography sx={{ marginLeft: 2 }} variant='h6'>
          {vendor.phone}
        </Typography>
        <Typography sx={{ marginLeft: 2 }} variant='h6'>
          {vendor.website}
        </Typography>
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