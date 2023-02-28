import React, { useState } from 'react';
import {
  TableCell,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Grid,
  Checkbox
} from '@mui/material';

import styles from '../../styles/components/OrderTableRow.json';

function OrderTableRow(props) {
  const { order } = props;
  const [open, setOpen] = useState(false);
  const formattedDate = new Date(order.orderDate);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dialogMarkup = (
    <></>
  );

  return (
    <>
      <TableRow onClick={handleOpen} sx={styles.row}>
        <TableCell>{order.id}</TableCell>
        <TableCell>{order.itemId}</TableCell>
        <TableCell>{formattedDate.toDateString()}</TableCell>
        <TableCell>{order.quantity}</TableCell>
      </TableRow>
      <Dialog open={open} onClose={handleClose}>
        {dialogMarkup}
      </Dialog>
    </>
  );
}

export default OrderTableRow;
