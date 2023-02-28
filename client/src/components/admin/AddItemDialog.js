import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogActions, 
  DialogTitle,
  IconButton,
  TextField,
  Button,
  Grid
} from '@mui/material';
import {
  Add as AddIcon,
  Close as CloseIcon
} from '@mui/icons-material';

import styles from '../../styles/components/AddItemDialog.json';

function AddItemDialog(props) {
  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState({
    name: '',
    price: '',
    vendorId: 0
  });
  const { vendor } = props;

  const handleOpen = () => {
    setOpen(true);
    setFormValue((prevState) => {
      return {
        ...prevState,
        vendorId: vendor.id
      };
    });
  };

  const revertState = () => {
    setFormValue((prevState) => {
      return {
        ...prevState,
        name: '',
        price: '',
        vendorId: 0
      };
    });
  };

  const handleClose = () => {
    setOpen(false);
    revertState();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newItemData = {
      name: formValue.name.trim(),
      price: parseInt(formValue.price.trim()),
      vendorId: vendor.id
    };
    // dispatch post new staged item
    handleClose();
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

  return (
    <>
      <IconButton sx={styles.iconButton} onClick={handleOpen} size='small'>
        <AddIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
        <DialogTitle>
          <Grid sx={styles.dialogTitle}>
            {`Add new item to ${vendor.name}`}
            <IconButton onClick={handleClose} size='small'>
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <form>
          <DialogContent sx={styles.dialogContent}>
            <TextField
              required
              id='name'
              name='name'
              label='Name'
              value={formValue.name}
              onChange={handleChange}
              sx={styles.textField}
              fullWidth
            />
            <TextField
              required
              id='price'
              name='price'
              label='Price'
              value={formValue.name}
              onChange={handleChange}
              sx={styles.textField}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit} variant='outlined' sx={{ color: '#609966' }} type='submit'>
              <AddIcon sx={styles.icon} />create item
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default AddItemDialog;
