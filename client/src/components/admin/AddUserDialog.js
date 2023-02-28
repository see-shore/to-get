import React, { useState } from 'react';
import {
  TextField,
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
  Box
} from '@mui/material';
import {
  Close as CloseIcon,
  Add as AddIcon
} from '@mui/icons-material';

import styles from '../../styles/components/AddUserDialog.json';

function AddUserDialog() {
  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const handleOpen = () => {
    setOpen(true);
    setFormValue({
      firstName: '',
      lastName: '',
      email: ''
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      firstName: formValue.firstName.trim(),
      lastName: formValue.lastName.trim(),
      email: formValue.email.trim()
    };
    // dispatch update this user
    handleClose();
  };

  return (
    <>
      <Box sx={styles.block} onClick={handleOpen}>
        <Grid sx={styles.buttonCopy}>
          <Button sx={{ color: "#FFFFFF" }}>
            <AddIcon sx={styles.icon} />Add new user
          </Button>
        </Grid>
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
        <DialogTitle>
          <Grid sx={styles.dialogTitle}>
            Add new user
            <IconButton onClick={handleClose} size='small'>
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <form>
          <DialogContent sx={styles.dialogContent}>
            <TextField
              required
              id='firstName'
              name='firstName'
              label='First Name'
              value={formValue.firstName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              required
              id='lastName'
              name='lastName'
              label='Last Name'
              value={formValue.lastName}
              sx={styles.textField}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              required
              id='email'
              name='email'
              label='Email'
              value={formValue.email}
              sx={styles.textField}
              onChange={handleChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit} variant='outlined' sx={{ color: '#609966' }} type='submit'>
              <AddIcon sx={styles.icon} />Create user
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default AddUserDialog;
