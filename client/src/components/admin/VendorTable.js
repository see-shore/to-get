import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Grid,
  Toolbar,
  IconButton
} from '@mui/material';

function createData(id, name, price, addedDate, available) {
  const formattedDate = new Date(addedDate);
  const formattedPrice = (price / 100).toFixed(2);
  return { id, name, formattedPrice, formattedDate, available };
}

function VendorTable(props) {
  const rows = [];
  const { items, vendor } = props;

  items.forEach((item) => {
    rows.push(createData(item.id, item.name, item.price, item.addedDate, item.available))
  });

  return (
    <Box sx={{ width: 600, height: 200 }}>
      <Toolbar>
        <Typography>
          {vendor.name}
        </Typography>
        <Typography sx={{ marginLeft: 2 }}>
          {vendor.phone}
        </Typography>
        <Typography sx={{ marginLeft: 2 }}>
          {vendor.website}
        </Typography>
      </Toolbar>
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell> ID </TableCell>
              <TableCell> Name </TableCell>
              <TableCell> Price </TableCell>
              <TableCell> Added on </TableCell>
              <TableCell> Available </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{`$${row.formattedPrice}`}</TableCell>
                <TableCell>{row.formattedDate.toDateString()}</TableCell>
                <TableCell>{row.available}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default VendorTable;
