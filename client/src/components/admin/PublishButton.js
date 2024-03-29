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
  Publish as PublishIcon
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';

import styles from '../../styles/components/PublishButton.json';
import { publishToUsersAsync } from '../../redux/slices/adminSlice';

function PublishButton() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    dispatch(publishToUsersAsync());
    handleClose();
  };

  return (
    <>
      <Box sx={styles.button} onClick={handleOpen}>
        <Grid sx={styles.buttonCopy}>
          <Button sx={{ color: "#FFFFFF" }}>
            <PublishIcon sx={styles.icon} />Publish items to users
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
          <p style={styles.text}>Publishing to users deletes all data in the published database. Did you archive all published data first?</p>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: '#ef5350' }} variant='outlined' onClick={handleSubmit}>
            <PublishIcon sx={styles.icon} />Yes
          </Button>
          <Button sx={styles.cancelButton} onClick={handleClose} type='submit'>
            <CloseIcon sx={styles.icon} />Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PublishButton;
