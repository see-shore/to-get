import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';

import styles from '../../styles/components/CompiledOrderAccordion.json';
import { useSelector } from 'react-redux';
import { selectItemsMap } from '../../redux/selectors/selectors';

function CompiledOrderAccordion(props) {
  const { user, orders } = props;
  const itemsMap = useSelector((state) => selectItemsMap(state));
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(0);
    orders.forEach(order => {
      if (itemsMap[order.itemId]) {
        const item = itemsMap[order.itemId];
        const subtotal = item.pricePerUnit * order.quantity;
        setTotal((prevState) => prevState + subtotal);
      }
    });
  }, [orders, itemsMap])

  const generateOrderLine = (order) => {
    if (itemsMap[order.itemId]) {
      const item = itemsMap[order.itemId];
      const subtotal = item.pricePerUnit * order.quantity;
      return (
        <div key={order.id} style={styles.orderLine}>
          <p style={styles.text}>{`${item.name} (Item ID: ${item.id}) ${order.quantity}x`}</p>
          <p style={styles.text}>{`$${(subtotal / 100).toFixed(2)}`}</p>
        </div>
      );
    }
  }

  return (
    <Accordion sx={styles.accordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "#FFFFFF" }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={styles.accordionSummary}
      >
          <p style={styles.header}>{user.firstName}'s Order Summary</p>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          {orders.map((order) => generateOrderLine(order))}
        </div>
        <hr style={styles.line} />
        <div style={styles.orderLine}>
          <p style={styles.text}>Total</p>
          <p style={styles.text}>{`$${(total / 100).toFixed(2)}`}</p>
        </div>
      </AccordionDetails>
    </Accordion>
  );  
}

export default CompiledOrderAccordion;
