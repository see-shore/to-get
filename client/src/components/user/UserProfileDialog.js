import React, { useState } from 'react';
import { Dialog, DialogContent, DialogActions } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { useAuth0 } from '@auth0/auth0-react';

import styles from '../../styles/components/UserProfileDialog.json';
import { NODE_BASE_URL } from '../../App';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/slices/itemsSlice';
import dialogStyles from '../../styles/components/CartDialog.json';
import { Button } from '../../styles/components/UserProfileDialog.styled';

function UserProfileDialog(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { logout } = useAuth0();
  const { user } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(clearCart());
    logout({
      logoutParams: { returnTo: NODE_BASE_URL + '/login' },
    });
  };

  return (
    <>
      <Button onClick={handleOpen} style={styles.user}>
        <img src={user.imageUrl} style={styles.avatar} alt='User Avatar' />
        <p style={styles.userName}>{user.firstName}</p>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='xs'
        sx={styles.dialog}
        PaperProps={dialogStyles.paperStyle}
      >
        <DialogContent sx={styles.dialogContent}>
          <div style={styles.topPanel}>
            <div style={styles.imageContainer}>
              <img style={styles.image} src={user.imageUrl} alt='User Icon' />
            </div>
          </div>
          <div style={styles.bottomPanel}>
            <p style={styles.header}>{`${user.firstName} ${user.lastName}`}</p>
            <p style={styles.text}>{`${user.email}`}</p>
          </div>
        </DialogContent>
        <DialogActions style={styles.footer}>
          <button className={'styled-button'} onClick={() => handleLogout()} style={styles.button} type='submit'>
            <LogoutIcon sx={styles.icon} />
            <p style={styles.buttonText}>{`Log Out`}</p>
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserProfileDialog;
