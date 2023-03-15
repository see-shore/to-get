import React from 'react';
import { useSelector } from 'react-redux';

import OrderAccordion from './OrderAccordion';
import CompiledOrderAccordion from './CompiledOrderAccordion';
import { selectUserOrdersMap } from '../../redux/selectors/selectors';

function OrdersPanel() {
  const users = useSelector((state) => state.users.users);
  const userOrdersMap = useSelector((state) => selectUserOrdersMap(state));

  return (
    <div>
      {users.map((user) => {
        let orders = [];
        if (userOrdersMap[user.id]) {
          orders = userOrdersMap[user.id];
        }
        return (
          <div key={user.id} style={{ margin: "20px auto 20px 45px" }}>
            <p style={{ fontFamily: "helvetica", fontSize: 12, marginBottom: 5 }}>{`${user.firstName} ${user.lastName}`}</p>
            <CompiledOrderAccordion user={user} orders={orders} />
            <OrderAccordion user={user} orders={orders} />
          </div>
        );
      })}
    </div>
  );
}

export default OrdersPanel;
