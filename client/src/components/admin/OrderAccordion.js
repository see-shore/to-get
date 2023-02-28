import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';

function OrderAccordion(props) {
  const { user, orders } = props;

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
          <Typography>{user.firstName + " " + user.lastName}'s Orders</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {JSON.stringify(orders)}
      </AccordionDetails>
    </Accordion>
  );
}

export default OrderAccordion;
