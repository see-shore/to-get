import React from 'react';
import { useSelector } from 'react-redux';

import OrderAccordion from './OrderAccordion';
import { selectUserOrdersMap } from '../../redux/selectors/selectors';

function OrdersPanel() {
  const users = useSelector((state) => state.users.users);
  const userOrdersMap = useSelector((state) => selectUserOrdersMap(state));

  return (
    <div>
      <div style={{ margin: "auto auto 15px 45px" }}>
        {users.map((user) => {
          let orders = [];
          if (userOrdersMap[user.id]) {
            orders = userOrdersMap[user.id];
          }
          return (
            <OrderAccordion key={user.id} user={user} orders={orders} />
          );
        })}
      </div>
    </div>
  );
}

export default OrdersPanel;
