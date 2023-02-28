import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

import styles from '../../styles/components/OrderTable.json';
import OrderTableRow from './OrderTableRow';

function OrderTable(props) {
  const { orders } = props;

  return (
    <TableContainer>
      <Table size='small'>
        <TableHead>
          <TableRow sx={styles.header}>
            <TableCell><h4>Order ID</h4></TableCell>
            <TableCell><h4>Item ID</h4></TableCell>
            <TableCell><h4>Ordered on</h4></TableCell>
            <TableCell> <h4>Quantity</h4></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <OrderTableRow key={order.id} order={order} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderTable;
