import React from 'react';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from 'react-router-dom';
import useWindowWidth from '../../hooks/useWindowWidth';

import styles from '../../styles/components/AdminButton.json';
import { Button } from '../../styles/components/AdminButton.styled';

function AdminButton() {
  const navigate = useNavigate();
  const width = useWindowWidth();

  const handleClick = () => {
    navigate('/admin');
  };

  return (
    <Button style={styles.container} onClick={() => handleClick()}>
      <div style={styles.button}>
        <AdminPanelSettingsIcon sx={styles.icon} />
      </div>
      {width > 600 && <p style={styles.copy}>Admin Console</p>}
    </Button>
  );
}

export default AdminButton;
