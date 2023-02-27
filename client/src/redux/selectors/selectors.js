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
