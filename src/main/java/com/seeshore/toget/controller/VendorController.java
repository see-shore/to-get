package com.seeshore.toget.controller;

import com.seeshore.toget.model.Vendor;
import com.seeshore.toget.service.IVendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Controller
public class VendorController {

    @Autowired
    private IVendorService vendorService;

    // Fetch all vendors
    @GetMapping("/vendor/all")
    public ResponseEntity<List<Vendor>> getAllVendors() {
        try {
            List<Vendor> vendors = new ArrayList<>(vendorService.findAllVendors());
            return new ResponseEntity<>(vendors, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }

    // Create a new vendor
    @PostMapping("/vendor/new")
    public ResponseEntity<Vendor> saveVendor(@RequestBody Vendor vendor) {
        try {
            Vendor savedVendor = vendorService.saveVendor(vendor);
            return new ResponseEntity<>(savedVendor, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }

    // Delete a vendor
    @DeleteMapping("/vendor")
    public ResponseEntity<String> deleteVendor(@RequestParam Long vendorId) {
        try {
            vendorService.deleteVendorById(vendorId);
            return ResponseEntity.status(HttpStatus.OK)
                    .body("Successfully deleted vendor with ID: " + vendorId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }
}
