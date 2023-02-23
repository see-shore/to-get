package com.seeshore.toget.controller;

import com.seeshore.toget.model.Item;
import com.seeshore.toget.model.Order;
import com.seeshore.toget.model.Vendor;
import com.seeshore.toget.model.archived.ArchivedItem;
import com.seeshore.toget.model.archived.ArchivedOrder;
import com.seeshore.toget.model.archived.ArchivedVendor;
import com.seeshore.toget.model.staged.StagedItem;
import com.seeshore.toget.model.staged.StagedVendor;
import com.seeshore.toget.service.IItemService;
import com.seeshore.toget.service.IOrderService;
import com.seeshore.toget.service.IVendorService;
import com.seeshore.toget.service.archived.IArchivedItemService;
import com.seeshore.toget.service.archived.IArchivedOrderService;
import com.seeshore.toget.service.archived.IArchivedVendorService;
import com.seeshore.toget.service.staged.IStagedItemService;
import com.seeshore.toget.service.staged.IStagedVendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;

@Controller
public class AdminController {
    @Autowired
    private IVendorService vendorService;
    @Autowired
    private IItemService itemService;
    @Autowired
    private IOrderService orderService;
    @Autowired
    private IArchivedVendorService archivedVendorService;
    @Autowired
    private IArchivedItemService archivedItemService;
    @Autowired
    private IArchivedOrderService archivedOrderService;
    @Autowired
    private IStagedVendorService stagedVendorService;
    @Autowired
    private IStagedItemService stagedItemService;

    // Copy all published data and add it to the archived tables
    @PostMapping("/admin/archive-all")
    public ResponseEntity<String> archiveAllPublishedEntities() {
        try {
            // Maps old vendor IDs (published) to new ones (archived)
            // { oldId: newId }
            HashMap<Long, Long> vendorIdMap = new HashMap<Long, Long>();

            // First, retrieve, copy, and archive all vendors.
            List<Vendor> vendors = vendorService.findAllVendors();
            for (Vendor vendor : vendors) {
                ArchivedVendor archivedVendor = new ArchivedVendor(vendor);
                ArchivedVendor savedVendor = archivedVendorService.saveArchivedVendor(archivedVendor);
                vendorIdMap.put(vendor.getId(), savedVendor.getId());
            }

            // Maps old item IDs (published) to new ones (archived)
            // { oldId: newId }
            HashMap<Long, Long> itemIdMap = new HashMap<Long, Long>();

            // Then archive all items.
            List<Item> items = itemService.findAllItems();
            for (Item item : items) {
                Long vendorId = vendorIdMap.get(item.getVendor().getId());
                ArchivedItem archivedItem = new ArchivedItem(vendorId, item);
                ArchivedItem savedItem = archivedItemService.saveArchivedItem(archivedItem);
                itemIdMap.put(item.getId(), savedItem.getId());
            }

            // Finally, archive all orders.
            List<Order> orders = orderService.findAllOrders();
            for (Order order : orders) {
                Long itemId = itemIdMap.get(order.getItem().getId());
                ArchivedOrder archivedOrder = new ArchivedOrder(itemId, order);
                ArchivedOrder savedItem = archivedOrderService.saveArchivedOrder(archivedOrder);
            }

            return ResponseEntity.status(HttpStatus.OK)
                    .body("Successfully archived all published data.");
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }

    // Delete all data in the published tables
    @DeleteMapping("/admin/purge-all")
    public ResponseEntity<String> purgeAllPublishedEntities() {
        try {
            vendorService.deleteAllVendors();
            itemService.deleteAllItems();

            return ResponseEntity.status(HttpStatus.OK)
                    .body("Successfully purged all published data.");
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }

    // Purge all published data, then copy staged data into published tables
    @PostMapping("/admin/publish-to-users")
    public ResponseEntity<String> publishStagedEntities() {
        try {
            vendorService.deleteAllVendors();
            itemService.deleteAllItems();

            HashMap<Long, Vendor> publishedVendorMap = new HashMap<Long, Vendor>();

            List<StagedVendor> stagedVendors = stagedVendorService.findAllStagedVendors();
            for (StagedVendor stagedVendor : stagedVendors) {
                if (stagedVendor.getAvailable() == 1) {
                    Vendor vendor = new Vendor(stagedVendor);
                    Vendor savedVendor = vendorService.saveVendor(vendor);
                    publishedVendorMap.put(stagedVendor.getId(), savedVendor);
                }
            }

            List<StagedItem> stagedItems = stagedItemService.findAllStagedItems();
            for (StagedItem stagedItem : stagedItems) {
                if (stagedItem.getAvailable() == 1) {
                    Vendor vendor = publishedVendorMap.get(stagedItem.getStagedVendor().getId());
                    Item item = new Item(stagedItem, vendor);
                    Item savedItem = itemService.saveItem(item);
                }
            }

            return ResponseEntity.status(HttpStatus.OK)
                    .body("Successfully purged all published data.");
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }
}
