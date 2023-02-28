import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

import styles from '../../styles/components/UserBlock.json';
import Avatar from '../../woman-avatar.png';

function UserBlock(props) {
  const { user } = props;

  return (
    <Box sx={styles.block}>
      <Grid container>
        <Grid item>
          <img src={Avatar} style={styles.avatar} alt="Jane Doe Avatar"/>
        </Grid>
        <Grid item sx={styles.userText}>
          <Grid>
            <h3>{user.firstName + " " + user.lastName}</h3>
          </Grid>
          <Grid sx={styles.userDetails}>
            <h4 style={{ marginRight: 3 }}>{`ID: ${user.id}, Email: `}</h4>
            <h4>{user.email}</h4>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserBlock;
