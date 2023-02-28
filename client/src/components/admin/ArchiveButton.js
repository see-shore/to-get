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
  AutoDelete as AutoDeleteIcon
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';

import styles from '../../styles/components/ArchiveButton.json';
import { archiveAllPublishedDataAsync } from '../../redux/slices/adminSlice';

function ArchiveButton() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    dispatch(archiveAllPublishedDataAsync());
    handleClose();
  };

  return (
    <>
      <Box sx={styles.button} onClick={handleOpen}>
        <Grid sx={styles.buttonCopy}>
          <Button sx={{ color: "#FFFFFF" }}>
            <AutoDeleteIcon sx={styles.icon} />Archive published data
          </Button>
        </Grid>
      </Box>
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
          <h4>You are about to archive all published data (including orders). Are you sure you want to do this?</h4>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: '#ef5350' }} variant='outlined' onClick={handleSubmit}>
            <AutoDeleteIcon sx={styles.icon} />Yes
          </Button>
          <Button sx={styles.cancelButton} onClick={handleClose} type='submit'>
            <CloseIcon sx={styles.icon} />Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ArchiveButton;
