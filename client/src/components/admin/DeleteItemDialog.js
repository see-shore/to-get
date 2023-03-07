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
import { Close as CloseIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

import styles from '../../styles/components/DeleteItemDialog.json';
import { deleteStagedItemAsync } from '../../redux/slices/staged/stagedItemsSlice';

function DeleteItemDialog(props) {
  const [open, setOpen] = useState(false);
  const { itemId } = props;
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteStagedItemAsync(itemId));
    handleClose();
    props.onClose();
  };

  return (
    <>
      <Button style={{ color: '#ef5350' }} variant='outlined' onClick={handleOpen}>
        <DeleteIcon sx={styles.icon} />Delete Item
      </Button>
      <Dialog open={open} onClose={handleClose}>
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
