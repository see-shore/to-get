import React, { useState } from 'react';
import {
  TableCell,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Grid,
  Checkbox
} from '@mui/material';
import {
  Send as SendIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';

import styles from '../../styles/components/VendorTableRow.json';
import DeleteItemDialog from './DeleteItemDialog';
import { updateStagedItemAsync } from '../../redux/slices/staged/stagedItemsSlice';

function availabilityCopy(available) {
  if (available === 1) {
    return 'YES';
  }
  return 'NO';
}

function VendorTableRow(props) {
  const { row, vendor } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState({
    name: '',
    price: '',
    units: '',
    description: '',
    available: 1
  });

  const handleOpen = () => {
    setOpen(true);
    setFormValue({
      name: row.name,
      price: row.price.toString(),
      units: row.units,
      description: row.description,
      available: row.available
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const itemData = {
      id: row.id,
      price: parseInt(formValue.price),
      ...formValue
    };
    dispatch(updateStagedItemAsync(itemData));
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

  const handleCheckChange = (event) => {
    setFormValue((prevState) => {
      return {
        ...prevState,
        available: (event.target.checked ? 1 : 0)
      };
    });
  };

  const dialogMarkup = (
    <>
      <DialogTitle>
        <Grid sx={styles.dialogTitle}>
          {`Edit Staged Item with ID: ${row.id}`}
          <IconButton onClick={handleClose} size='small'>
            <CloseIcon />
          </IconButton>
        </Grid>
      </DialogTitle>
      <form>
        <DialogContent sx={styles.dialogContent}>
          <Grid container sx={styles.dialogContainer}>
            <Grid item>
              {`Vendor: ${vendor.name}`}
            </Grid>
            <TextField
              id='name'
              name='name'
              label='Item Name'
              placeholder={row.name}
              value={formValue.name}
              onChange={handleChange}
              fullWidth
              sx={styles.textField}
            />
            <TextField 
              id='price'
              name='price'
              label='Price (Cents)'
              placeholder={row.price.toString()}
              value={formValue.price}
              onChange={handleChange}
              fullWidth
              sx={styles.textField}
            />
            <TextField 
              id='units'
              name='units'
              label='Units (e.g., "lb", "L", "unit")'
              placeholder={row.units}
              value={formValue.units}
              onChange={handleChange}
              fullWidth
              sx={styles.textField}
            />
            <TextField 
              id='description'
              name='description'
              label='Description'
              placeholder={row.description}
              value={formValue.description}
              onChange={handleChange}
              fullWidth
              sx={styles.textField}
            />
            <Grid container sx={styles.availableRow}>
              <Grid item sx={{ marginLeft: 2 }}>
                Available
              </Grid>
              <Grid item>
                <Checkbox
                  id='availableCol'
                  name='availableCol'
                  checked={(formValue.available === 1)}
                  onChange={handleCheckChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <DeleteItemDialog itemId={row.id} onClose={handleClose} />
          <Button sx={{ color: '#609966' }} variant='outlined' onClick={handleSubmit} type='submit'>
            <SendIcon sx={styles.icon} />Edit Staged Item
          </Button>
        </DialogActions>
      </form>
    </>
  );

  return (
    <>
      <TableRow key={row.id} onClick={handleOpen} sx={styles.row}>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{`$${row.formattedPrice}`}</TableCell>
        <TableCell>{row.units}</TableCell>
        <TableCell>{row.description}</TableCell>
        <TableCell>{row.formattedDate.toDateString()}</TableCell>
        <TableCell>{availabilityCopy(row.available)}</TableCell>
      </TableRow>
      <Dialog open={open} onClose={handleClose}>
        {dialogMarkup}
      </Dialog>
    </>
  );
}

export default VendorTableRow;
