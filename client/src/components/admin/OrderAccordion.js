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
          <h3>{user.firstName + " " + user.lastName}'s Orders</h3>
      </AccordionSummary>
      <AccordionDetails>
        <OrderTable orders={orders} />
      </AccordionDetails>
    </Accordion>
  );
}

export default OrderAccordion;
