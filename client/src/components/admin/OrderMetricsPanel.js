import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectItemsMap, selectOrderSummaryMap } from '../../redux/selectors/selectors';

import styles from '../../styles/components/OrderMetricsPanel.json';

function OrderMetricsPanel() {
  const orderSummaryMap = useSelector((state) => selectOrderSummaryMap(state));
  const itemsMap = useSelector((state) => selectItemsMap(state));
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(0);
    Object.entries(orderSummaryMap).forEach((obj) => {
      const [, val] = obj;
      setTotal(prevState => prevState + val[1]);
    })
  }, [orderSummaryMap]);

  const generateItemRow = (itemId) => {
    const item = itemsMap[itemId];
    return (
      <div key={itemId} style={styles.orderLine}>
        <p style={styles.body}>{`${item.name} – ${orderSummaryMap[itemId][0]}x`}</p>
        <p style={styles.body}>{`$${(orderSummaryMap[itemId][1] / 100).toFixed(2)}`}</p>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.summaryCard}>
        <div style={styles.innerCard}>
          <div style={styles.header}>
            <p>Aggregate Order Summary</p>
            <hr style={styles.line} />
          </div>
          {Object.keys(orderSummaryMap).map((itemId) => generateItemRow(itemId))}
          <hr style={styles.line} />
          <div style={styles.orderLine}>
            <p style={styles.body}>Total</p>
            <p style={styles.body}>{`$${(total / 100).toFixed(2)}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderMetricsPanel;
