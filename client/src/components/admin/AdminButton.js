import React from 'react';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from 'react-router-dom';
import useWindowWidth from '../../hooks/useWindowWidth';

import styles from '../../styles/components/AdminButton.json';

function AdminButton() {
  const navigate = useNavigate();
  const width = useWindowWidth();

  const handleClick = () => {
    navigate('/admin');
  };

  return (
    <button style={styles.container} onClick={() => handleClick()}>
      <div style={styles.button}>
        <AdminPanelSettingsIcon sx={styles.icon} />
      </div>
      {width > 600 && <p style={styles.copy}>Admin Console</p>}
    </button>
  );
}

export default AdminButton;
