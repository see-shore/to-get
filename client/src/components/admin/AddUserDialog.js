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
  Box,
  CircularProgress
} from '@mui/material';
import {
  Close as CloseIcon,
  Add as AddIcon
} from '@mui/icons-material';

import styles from '../../styles/components/AddUserDialog.json';
import { useDispatch, useSelector } from 'react-redux';
import { createCredentialsAsync, setError } from '../../redux/slices/usersSlice';

function AddUserDialog() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const token = useSelector((state) => state.users.token);
  const error = useSelector((state) => state.users.error);
  const loadingUserData = useSelector((state) => state.users.loadingUserData);

  const handleOpen = () => {
    setOpen(true);
    setFormValue({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (error) dispatch(setError(null));
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      firstName: formValue.firstName.trim(),
      lastName: formValue.lastName.trim(),
      email: formValue.email.trim(),
      password: formValue.password.trim()
    };
    const data = { user, token }
    dispatch(createCredentialsAsync(data));
  };

  const determineButtonStatus = () => {
    return error || loadingUserData;
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
            <TextField
              required
              id='password'
              type='password'
              name='password'
              label='Password'
              value={formValue.password}
              sx={styles.textField}
              onChange={handleChange}
              fullWidth
            />
            {error && <p style={styles.error}>{error}</p>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit} disabled={determineButtonStatus()} 
                  variant='outlined' sx={{ color: '#609966' }} type='submit'>
                {loadingUserData ? 
                  <CircularProgress size={17} />
                  :
                  <>
                  <AddIcon sx={styles.icon} />Create user
                  </>
                }
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default AddUserDialog;
