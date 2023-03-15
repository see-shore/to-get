import React, { useState } from 'react';
import {
  Box,
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton
} from '@mui/material';
import {
  Close as CloseIcon,
  CalendarMonth as CalendarMonthIcon,
  Publish as PublishIcon
} from '@mui/icons-material';
import DatePicker from "react-datepicker";

import styles from '../../styles/components/DeliveryDateDialog.json';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from 'react-redux';
import { publishDeliveryDateAsync } from '../../redux/slices/adminSlice';

function DeliveryDateDialog() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const deliveryData = {
      deliveryDate: date
    };
    dispatch(publishDeliveryDateAsync(deliveryData));
    handleClose();
  };

  return (
    <>
      <Box sx={styles.button} onClick={handleOpen}>
        <Grid sx={styles.buttonCopy}>
          <Button sx={{ color: "#FFFFFF" }}>
            <CalendarMonthIcon sx={styles.icon} />Publish delivery date
          </Button>
        </Grid>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Grid sx={styles.dialogTitle}>
            Publish a new delivery date
            <IconButton onClick={handleClose} size='small'>
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent sx={styles.dialogContent}>
          <div>
            <p>Select a new date:</p>
          </div>
          <div>
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: '#ef5350' }} variant='outlined' onClick={handleSubmit}>
            <PublishIcon sx={styles.icon} />Publish
          </Button>
          <Button sx={styles.cancelButton} onClick={handleClose} type='submit'>
            <CloseIcon sx={styles.icon} />Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeliveryDateDialog;
