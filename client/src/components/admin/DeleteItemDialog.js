import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  IconButton
} from '@mui/material';
import { Close as CloseIcon, Delete as DeleteIcon, Send as SendIcon } from '@mui/icons-material';

import styles from '../../styles/components/DeleteItemDialog.json';

function DeleteItemDialog(props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    // TODO: dispatch delete
    handleClose();
    props.onClose();
  };

  return (
    <>
      <Button style={{ color: '#ef5350' }} variant='outlined' onClick={handleOpen}>
        <DeleteIcon sx={styles.icon} />Delete Item
      </Button>
      <Dialog open={open}>
        <DialogTitle>
          <Grid sx={styles.dialogTitle}>
            Warning
            <IconButton onClick={handleClose} size='small'>
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <h4>You are about to permanently delete a staged item. Are you sure?</h4>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: '#ef5350' }} variant='outlined' onClick={handleDelete}>
            <DeleteIcon sx={styles.icon} />Yes
          </Button>
          <Button sx={styles.cancelButton} onClick={handleClose} type='submit'>
            <CloseIcon sx={styles.icon} />Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteItemDialog;
