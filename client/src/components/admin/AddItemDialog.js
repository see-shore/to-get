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
import { useDispatch } from 'react-redux';

import styles from '../../styles/components/AddItemDialog.json';
import { uploadImageAndSaveStagedItemAsync } from '../../redux/slices/staged/stagedItemsSlice';

function AddItemDialog(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const [formValue, setFormValue] = useState({
    name: '',
    price: '',
    units: '',
    pricePerUnit: '',
    description: '',
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
        units: '',
        pricePerUnit: '',
        description: '',
        vendorId: 0
      };
    });
  };

  const handleClose = () => {
    setFile(null);
    setOpen(false);
    revertState();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const item = {
      name: formValue.name.trim(),
      price: parseInt(formValue.price.trim()),
      pricePerUnit: parseInt(formValue.pricePerUnit.trim()),
      units: formValue.units.trim(),
      description: formValue.description.trim(),
      vendorId: vendor.id
    };

    const requestData = {
      file, item, method: 'create'
    }

    dispatch(uploadImageAndSaveStagedItemAsync(requestData));
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

  const handleFileInputChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  }

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
              label='Price (Cents)'
              value={formValue.price}
              onChange={handleChange}
              sx={styles.textField}
              fullWidth
            />
            <TextField
              required
              id='units'
              name='units'
              label='Units (e.g., "lb", "L", "unit")'
              value={formValue.units}
              onChange={handleChange}
              sx={styles.textField}
              fullWidth
            />
            <TextField
              required
              id='pricePerUnit'
              name='pricePerUnit'
              label='Individual Price (Cents / Indiv. Item)'
              value={formValue.pricePerUnit}
              onChange={handleChange}
              sx={styles.textField}
              fullWidth
            />
            <TextField
              required
              id='description'
              name='description'
              label='Description'
              value={formValue.description}
              onChange={handleChange}
              sx={styles.textField}
              fullWidth
            />
          <div style={styles.fileInput}>
            <p style={styles.instruction}>Image Upload: please only attach .jpeg images of 0.5 MB or less.</p>
            <input type="file" name="file" onChange={handleFileInputChange} style={styles.fileInput} />
          </div>
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
