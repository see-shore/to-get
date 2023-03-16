import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogActions, 
  Button 
} from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { useAuth0 } from '@auth0/auth0-react';

import styles from '../../styles/components/UserProfileDialog.json';
import { NODE_BASE_URL } from '../../App';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/slices/itemsSlice';

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
      <div onClick={handleOpen} style={styles.user}>
        <img src={user.imageUrl} style={styles.avatar} alt='User Avatar' />
        <p style={styles.userName}>{user.firstName}</p>
      </div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs' sx={styles.dialog}>
        <DialogContent sx={styles.dialogContent}>
          <div style={styles.leftPanel}>
            <img style={styles.image} src={user.imageUrl} alt="User Icon" />
          </div>
          <div style={styles.rightPanel}>
            <p style={styles.header}>{`${user.firstName} ${user.lastName}`}</p>
            <p style={styles.text}>{`${user.email}`}</p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleLogout()} sx={styles.button} type='submit'>
            <LogoutIcon sx={styles.icon} />
            {`Log Out`}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserProfileDialog;
