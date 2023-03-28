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
import { deleteUserAsync } from '../../redux/slices/usersSlice';

function DeleteUserDialog(props) {
  const [open, setOpen] = useState(false);
  const { userId } = props;
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteUserAsync(userId));
    handleClose();
    props.onClose();
  };

  return (
    <>
      <Button style={{ color: '#ef5350' }} variant='outlined' onClick={handleOpen}>
        <DeleteIcon sx={styles.icon} />Delete User
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
          <h4>You are about to permanently delete a user. Are you sure?</h4>
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

export default DeleteUserDialog;
