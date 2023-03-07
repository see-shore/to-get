import React from 'react';
import {
  IconButton
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import styles from '../../styles/components/AdminButton.json';
import { NODE_BASE_URL } from '../../App';

function AdminButton() {

  const handleClick = () => {
    window.location.href = NODE_BASE_URL + '/admin';
  };

  return (
    <div style={styles.container} onClick={() => handleClick()}>
      <IconButton sx={styles.button}>
        <AdminPanelSettingsIcon sx={styles.icon} />
      </IconButton>
      <p style={styles.copy}>Admin Console</p>
    </div>
  );
}

export default AdminButton;
