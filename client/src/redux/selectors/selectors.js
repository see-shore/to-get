import { createSelector } from 'reselect';

const selectStagedVendors = state => state.stagedVendors.stagedVendors;

const selectStagedItems = state => state.stagedItems.stagedItems;

export const selectStagedVendorsMap = createSelector(
  selectStagedVendors,
  (stagedVendors) => {
    const map = {};

    stagedVendors.forEach((vendor) => {
      map[vendor.id] = vendor;
    });

    return map;
  }
);

export const selectStagedItemsMap = createSelector(
  selectStagedItems,
  selectStagedVendors,
  (stagedItems, stagedVendors) => {
    const map = {};

    if (stagedItems.length && stagedVendors.length) {
      stagedVendors.forEach((vendor) => {
        map[vendor.id] = [];
      });

      stagedItems.forEach((item) => {
        if (map[item.stagedVendor.id]) {
          map[item.stagedVendor.id].push(item);
        }
      });
    }

    return map;
  }
);

// Takes parameters state and itemId
export const selectStagedItemById = createSelector(
  [
    state => state.stagedItems.stagedItems,
    (state, itemId) => itemId
  ],
  (stagedItems, itemId) => stagedItems.filter(item => item.id === itemId)
);

const selectUsers = state => state.users.users;

const selectOrders = state => state.orders.orders;

export const selectUserOrdersMap = createSelector(
  selectUsers,
  selectOrders,
  (users, orders) => {
    const map = {};

    if (users.length && orders.length) {
      users.forEach((user) => {
        map[user.id] = [];
      });

      orders.forEach((order) => {
        if (map[order.userId]) {
          map[order.userId].push(order);
        }
      });
    }

    return map;
  }
);

const selectItems = state => state.items.items;

export const selectItemsMap = createSelector(
  selectItems,
  (items) => {
    const map = {};

    if (items.length) {
      items.forEach((item) => {
        map[item.id] = item;
      });
    }

    return map;
  }
);

// Takes parameters state and itemId
export const selectItemCount = createSelector(
  [
    state => state.items.cart,
    (state, itemId) => itemId
  ],
  (cart, itemId) => {
    return cart[itemId];
  }
);
