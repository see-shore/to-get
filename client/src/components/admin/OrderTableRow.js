import React, { useState } from 'react';
import {
  TableCell,
  TableRow,
  Dialog,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Delete as DeleteIcon } from '@mui/icons-material';

import styles from '../../styles/components/OrderTableRow.json';
import { selectItemsMap } from '../../redux/selectors/selectors';

function OrderTableRow(props) {
  const { order, user } = props;
  const [open, setOpen] = useState(false);
  const formattedDate = new Date(order.orderDate);
  const itemsMap = useSelector(state => selectItemsMap(state));
  const item = itemsMap[order.itemId];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    // DISPATCH DELETE
    handleClose();
  };

  const dialogMarkup = (
    <>
      <DialogContent sx={styles.dialogContent}>
        <p style={styles.header}>{user.firstName + " " + user.lastName + "'s Order"}</p>
        <p style={styles.bodyLine}>{`Item: ${item.name}`}</p>
        <p style={styles.bodyLine}>{`Price: $${(item.price / 100).toFixed(2)} / ${item.units}`}</p>
        <p style={styles.bodyLine}>{`Quantity: ${order.quantity}`}</p>
        <p style={styles.bodyLine}>{`Ordered on: ${formattedDate.toDateString()}`}</p>
      </DialogContent>
      <DialogActions>
        <Button style={{ color: '#ef5350' }} variant='outlined' onClick={handleDelete}>
          <DeleteIcon sx={styles.icon} />Delete order
        </Button>
      </DialogActions>
    </>
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
