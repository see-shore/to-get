import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Grid,
  Button
} from '@mui/material';
import {
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useAuth0 } from '@auth0/auth0-react';

import Avatar from '../../woman-avatar.png';
import styles from '../../styles/components/UserProfileDialog.json';
import { NODE_BASE_URL } from '../../App';

function UserProfileDialog() {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth0();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div onClick={handleOpen}>
        <img src={Avatar} style={styles.avatar} alt="User Avatar"/>
      </div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs' sx={styles.dialog}>
        <DialogTitle>
          <Grid sx={styles.dialogTitle}>
            <p style={styles.title}>Jane Doe</p>
          </Grid>
        </DialogTitle>
        <DialogContent sx={styles.dialogContent}>
          <p style={styles.text}>USER INFO. WHAT GOES HERE?</p>
        </DialogContent>
        <DialogActions>
            <Button 
              onClick={() => logout({ logoutParams: { returnTo: (NODE_BASE_URL + '/login') } })} 
              sx={{ color:'#FFFFFF', backgroundColor: '#ef5350' }} 
              type='submit'
            >
              <LogoutIcon sx={styles.icon} />Log out
            </Button>
          </DialogActions>
      </Dialog>
    </>
    
  );
}

export default UserProfileDialog;
