import React from 'react';
import {
  IconButton
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from 'react-router-dom';

import styles from '../../styles/components/AdminButton.json';

function AdminButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/admin');
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
