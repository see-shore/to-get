import React from 'react';
import {
  Box,
  Grid,
  Button
} from '@mui/material';
import {
  Publish as PublishIcon
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';

import styles from '../../styles/components/PublishButton.json';
import { publishToUsersAsync } from '../../redux/slices/adminSlice';

function PublishButton() {
  const dispatch = useDispatch();

  return (
    <Box sx={styles.button}>
      <Grid sx={styles.buttonCopy}>
          <Button sx={{ color: "#FFFFFF" }}>
            <PublishIcon sx={styles.icon} />Publish to users
          </Button>
        </Grid>
    </Box>
  );
}

export default PublishButton;
