import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';

import OrderTable from './OrderTable';
import styles from '../../styles/components/OrderAccordion.json';

function OrderAccordion(props) {
  const { user, orders } = props;

  return (
    <Accordion sx={styles.accordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "#FFFFFF" }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={styles.accordionSummary}
      >
          <p style={styles.header}>{user.firstName}'s Order Breakdown</p>
      </AccordionSummary>
      <AccordionDetails>
        <OrderTable orders={orders} user={user} />
      </AccordionDetails>
    </Accordion>
  );
}

export default OrderAccordion;
