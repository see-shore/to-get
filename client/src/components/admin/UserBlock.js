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
  Edit as EditIcon,
  Close as CloseIcon,
  Send as SendIcon
} from '@mui/icons-material';

import styles from '../../styles/components/UserBlock.json';
import Avatar from '../../woman-avatar.png';

function UserBlock(props) {
  const { user } = props;
  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const handleOpen = () => {
    setOpen(true);
    setFormValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
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
        <Grid container>
          <Grid item>
            <img src={Avatar} style={styles.avatar} alt="Jane Doe Avatar"/>
          </Grid>
          <Grid item sx={styles.userText}>
            <Grid>
              <h3>{user.firstName + " " + user.lastName}</h3>
            </Grid>
            <Grid sx={styles.userDetails}>
              <h4 style={{ marginRight: 3 }}>{`ID: ${user.id}, Email: `}</h4>
              <h4>{user.email}</h4>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
        <DialogTitle>
          <Grid sx={styles.dialogTitle}>
            {`Edit user with ID: ${user.id}`}
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
              fullWidth
            />
            <TextField
              required
              id='lastName'
              name='lastName'
              label='Last Name'
              value={formValue.lastName}
              sx={styles.textField}
              fullWidth
            />
            <TextField
              required
              id='email'
              name='email'
              label='Email'
              value={formValue.email}
              sx={styles.textField}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit} variant='outlined' sx={{ color: '#609966' }} type='submit'>
              <SendIcon sx={styles.icon} />Edit user
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default UserBlock;
