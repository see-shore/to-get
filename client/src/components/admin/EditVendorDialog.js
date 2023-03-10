import React, { useState } from 'react';
import {
  TextField,
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid
} from '@mui/material';
import {
  Edit as EditIcon,
  Close as CloseIcon,
  Send as SendIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

import styles from '../../styles/components/EditVendorDialog.json';
import { useDispatch } from 'react-redux';
import { deleteStagedVendorAsync, updateStagedVendorAsync } from '../../redux/slices/staged/stagedVendorsSlice';

function EditVendorDialog(props) {
  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState({
    name: '',
    phone: '',
    website: ''
  });
  const dispatch = useDispatch();

  const { vendor } = props;

  const handleOpen = () => {
    setOpen(true);
    setFormValue({
      name: vendor.name,
      phone: vendor.phone,
      website: vendor.website
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
    const vendorData = {
      id: vendor.id,
      name: formValue.name.trim(),
      phone: formValue.phone.trim(),
      website: formValue.website.trim()
    };
    dispatch(updateStagedVendorAsync(vendorData));
    handleClose();
  };

  const handleDelete = () => {
    dispatch(deleteStagedVendorAsync(vendor.id));
    handleClose();
  }

  return (
    <>
      <IconButton sx={styles.iconButton} onClick={handleOpen} size='small'>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
        <DialogTitle>
          <Grid sx={styles.dialogTitle}>
            {`Edit Vendor with ID: ${vendor.id}`}
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
            <Button style={{ color: '#ef5350' }} variant='outlined' onClick={handleDelete}>
              <DeleteIcon sx={styles.icon} />Delete vendor
            </Button>
            <Button onClick={handleSubmit} variant='outlined' sx={{ color: '#609966' }} type='submit'>
              <SendIcon sx={styles.icon} />Edit vendor
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default EditVendorDialog;
