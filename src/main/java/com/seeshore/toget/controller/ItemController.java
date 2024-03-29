package com.seeshore.toget.controller;

import com.seeshore.toget.model.Item;
import com.seeshore.toget.model.Order;
import com.seeshore.toget.model.Vendor;
import com.seeshore.toget.model.request.RequestItem;
import com.seeshore.toget.service.IAmazonService;
import com.seeshore.toget.service.IItemService;
import com.seeshore.toget.service.IVendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
@CrossOrigin
public class ItemController {

    @Autowired
    private IItemService itemService;
    @Autowired
    private IVendorService vendorService;
    @Autowired
    private IAmazonService amazonService;

    // Create a new item
    @PostMapping("/item/new")
    public ResponseEntity<Item> saveItem(@RequestBody RequestItem requestItem) {
        try {
            Optional<Vendor> vendor = vendorService.findVendorById(requestItem.getVendorId());
            if (vendor.isEmpty()) {
                System.out.println("Provided vendor ID is unknown");
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "Provided vendor ID is unknown");
            }

            Item item = new Item(requestItem, vendor.get());
            Item savedItem = itemService.saveItem(item);
            return new ResponseEntity<>(savedItem, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }

    // Fetch all items of one vendor
    @GetMapping("/item")
    public ResponseEntity<List<Item>> findItemsByVendor(@RequestParam Long vendorId) {
        try {
            Optional<Vendor> vendor = vendorService.findVendorById(vendorId);
            if (vendor.isEmpty()) {
                System.out.println("Provided vendor ID is unknown");
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "Provided vendor ID is unknown");
            }

            List<Item> items = vendor.get().getItems();
            return new ResponseEntity<>(items, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }

    // Fetch all items
    @GetMapping("/item/all")
    public ResponseEntity<List<Item>> getAllItems() {
        try {
            List<Item> items = new ArrayList<>(itemService.findAllItems());
            return new ResponseEntity<>(items, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }


    // Delete one item
    @DeleteMapping("/item")
    public ResponseEntity<String> deleteItemById(@RequestParam Long itemId) {
        try {
            Optional<Item> item = itemService.findItemById(itemId);
            if (item.isEmpty()) {
                System.out.println("Provided item ID is unknown");
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "Provided item ID is unknown");
            }

            Item fetchedItem = item.get();
            for (Order order : fetchedItem.getOrders()) {
                order.dismissItem();
            }
            fetchedItem.dismissOrders();
            fetchedItem.dismissVendor();

            itemService.deleteItem(fetchedItem);
            return ResponseEntity.status(HttpStatus.OK)
                    .body("Successfully deleted item with ID: " + itemId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }

    // Update an item
    @PutMapping("/item")
    public ResponseEntity<Item> updateItem(@RequestParam Long itemId,
                                           @RequestBody RequestItem item) {
        try {
            Optional<Item> itemRecord = itemService.findItemById(itemId);
            if (itemRecord.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "Provided item ID is unknown");
            }
            Item fetchedItem = itemRecord.get();
            fetchedItem.setName(item.getName());
            fetchedItem.setPrice(item.getPrice());
            fetchedItem.setUnits(item.getUnits());
            fetchedItem.setPricePerUnit(item.getPricePerUnit());
            fetchedItem.setDescription(item.getDescription());
            fetchedItem.setImageUrl(item.getImageUrl());

            Item savedItem = itemService.saveItem(fetchedItem);
            return new ResponseEntity<>(savedItem, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }

    // Upload a new image
    @PostMapping(path = "/image", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<String> saveImage(@RequestPart MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "Provided file is empty");
            }

            String imageUrl = amazonService.upload(file);
            return new ResponseEntity<>(imageUrl, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }
}
