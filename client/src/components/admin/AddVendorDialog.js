import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  IconButton,
  TextField,
  Button,
  Grid,
  Box
} from '@mui/material';
import {
  Add as AddIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';

import styles from '../../styles/components/AddVendorDialog.json';
import { addStagedVendorAsync } from '../../redux/slices/staged/stagedVendorsSlice';

function AddVendorDialog() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState({
    name: '',
    phone: '',
    website: ''
  });

  const handleOpen = () => {
    setOpen(true);
    setFormValue({
      name: '',
      phone: '',
      website: ''
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const vendorData = {
      ...formValue
    };
    dispatch(addStagedVendorAsync(vendorData));
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
      <Box onClick={handleOpen} sx={styles.button}>
        <Grid sx={styles.buttonCopy}>
          <Button sx={{ color: "#FFFFFF" }}>
            <AddIcon sx={styles.icon} />Add vendor
          </Button>
        </Grid>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Grid sx={styles.dialogTitle}>
            Add new staged vendor
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
              id='phone'
              name='phone'
              label='Phone'
              value={formValue.phone}
              onChange={handleChange}
              sx={styles.textField}
              fullWidth
            />
            <TextField
              required
              id='website'
              name='website'
              label='Website'
              value={formValue.website}
              onChange={handleChange}
              sx={styles.textField}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit} variant='outlined' sx={{ color: '#609966' }} type='submit'>
              <AddIcon sx={styles.icon} />Create vendor
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default AddVendorDialog;
