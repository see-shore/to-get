package com.seeshore.toget.controller.staged;

import com.seeshore.toget.model.request.RequestItem;
import com.seeshore.toget.model.staged.StagedItem;
import com.seeshore.toget.model.staged.StagedVendor;
import com.seeshore.toget.service.staged.IStagedItemService;
import com.seeshore.toget.service.staged.IStagedVendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
public class StagedItemController {

    @Autowired
    private IStagedItemService stagedItemService;
    @Autowired
    private IStagedVendorService stagedVendorService;

    // Create a new staged item
    @PostMapping("/staged-item/new")
    public ResponseEntity<StagedItem> saveStagedItem(@RequestBody RequestItem requestItem) {
        try {
            Optional<StagedVendor> vendor = stagedVendorService.findStagedVendorById(requestItem.getVendorId());
            if (vendor.isEmpty()) {
                System.out.println("Provided vendor ID is unknown");
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "Provided vendor ID is unknown");
            }

            StagedItem item = new StagedItem(requestItem, vendor.get());
            StagedItem savedItem = stagedItemService.saveStagedItem(item);
            return new ResponseEntity<>(savedItem, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }

    // Fetch all staged items of one staged vendor
    @GetMapping("/staged-item")
    public ResponseEntity<List<StagedItem>> findStagedItemsByVendor(@RequestParam Long vendorId) {
        try {
            Optional<StagedVendor> vendor = stagedVendorService.findStagedVendorById(vendorId);
            if (vendor.isEmpty()) {
                System.out.println("Provided vendor ID is unknown");
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "Provided vendor ID is unknown");
            }

            List<StagedItem> items = vendor.get().getItems();
            return new ResponseEntity<>(items, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }

    // Fetch all staged items
    @GetMapping("/staged-item/all")
    public ResponseEntity<List<StagedItem>> getAllStagedItems() {
        try {
            List<StagedItem> items = new ArrayList<>(stagedItemService.findAllStagedItems());
            return new ResponseEntity<>(items, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }

    // Delete one staged item
    @DeleteMapping("/staged-item")
    public ResponseEntity<String> deleteStagedItemById(@RequestParam Long itemId) {
        try {
            Optional<StagedItem> item = stagedItemService.findStagedItemById(itemId);
            if (item.isEmpty()) {
                System.out.println("Provided staged item ID is unknown");
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "Provided staged item ID is unknown");
            }

            StagedItem fetchedItem = item.get();
            fetchedItem.dismissStagedVendor();
            stagedItemService.deleteStagedItem(fetchedItem);
            return ResponseEntity.status(HttpStatus.OK)
                    .body("Successfully deleted staged item with ID: " + itemId);
        } catch (Exception e) {
            System.out.println(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }
}
