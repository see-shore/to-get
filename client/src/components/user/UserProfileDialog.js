import React from 'react';
import Avatar from '../../woman-avatar.png';

import styles from '../../styles/components/UserProfileDialog.json';

function UserProfileDialog() {
  return (
    <div>
      <img src={Avatar} style={styles.avatar} alt="User Avatar"/>
    </div>
  );
}

export default UserProfileDialog;
