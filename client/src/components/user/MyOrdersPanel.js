import React from 'react';
import { useSelector } from 'react-redux';
import { selectItemsMap } from '../../redux/selectors/selectors';

import styles from '../../styles/components/MyOrdersPanel.json';
import ReceiptProduct from '../product/ReceiptProduct';
import { dateOptions } from '../../util/AppUtil';

function MyOrdersPanel(props) {
  const { orders, total } = props;
  const itemsMap = useSelector((state) => selectItemsMap(state));
  const totalText = 'Total Estimate:';
  const deliveryText = 'The delivery is scheduled on';
  const deliveryDate = useSelector((state) => state.admin.deliveryDate);

  return (
    <div style={styles.container}>
      <div style={styles.innerCard}>
        <div style={styles.listContainer}>
          {orders.map((order) => {
            const item = itemsMap[order.itemId];
            if (item) {
              return (
                <ReceiptProduct key={order.itemId} item={item} order={order} />
              );
            }
          })}
        </div>
        <div style={styles.totalLine}>
          <div>
            <p style={{ marginRight: 10 }}>{totalText}</p>
          </div>
          <div>
            <p>{`$${(total / 100).toFixed(2)}`}</p>
          </div>
        </div>
        <div style={styles.textCopy}>
          <p>{deliveryText}</p>
          <p style={{ marginTop: 5 }}>{new Date(deliveryDate).toLocaleDateString(undefined, dateOptions)}</p>
        </div>
      </div>
    </div>
  );
}

export default MyOrdersPanel;
