package com.seeshore.toget.controller.staged;

import com.seeshore.toget.model.staged.StagedItem;
import com.seeshore.toget.model.staged.StagedVendor;
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
@CrossOrigin
public class StagedVendorController {

    @Autowired
    private IStagedVendorService stagedVendorService;

    // Fetch all staged vendors
    @GetMapping("/staged-vendor/all")
    public ResponseEntity<List<StagedVendor>> getAllStagedVendors() {
        try {
            List<StagedVendor> vendors = new ArrayList<>(stagedVendorService.findAllStagedVendors());
            return new ResponseEntity<>(vendors, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }

    // Create a new staged vendor
    @PostMapping("/staged-vendor/new")
    public ResponseEntity<StagedVendor> saveStagedVendor(@RequestBody StagedVendor vendor) {
        try {
            vendor.setAvailable(1);
            StagedVendor savedVendor = stagedVendorService.saveStagedVendor(vendor);
            return new ResponseEntity<>(savedVendor, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }

    // Delete a staged vendor
    @DeleteMapping("/staged-vendor")
    public ResponseEntity<String> deleteStagedVendor(@RequestParam Long vendorId) {
        try {
            stagedVendorService.deleteStagedVendorById(vendorId);
            return ResponseEntity.status(HttpStatus.OK)
                    .body("Successfully deleted staged vendor with ID: " + vendorId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }

    // Update a staged vendor
    @PutMapping("/staged-vendor")
    public ResponseEntity<StagedVendor> updateStagedVendor(@RequestParam Long vendorId,
                                                     @RequestBody StagedVendor vendor) {
        try {
            Optional<StagedVendor> vendorRecord = stagedVendorService.findStagedVendorById(vendorId);
            if (vendorRecord.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "Provided item ID is unknown");
            }
            StagedVendor fetchedVendor = vendorRecord.get();
            fetchedVendor.setName(vendor.getName());
            fetchedVendor.setPhone(vendor.getPhone());
            fetchedVendor.setWebsite(vendor.getWebsite());

            StagedVendor savedVendor = stagedVendorService.saveStagedVendor(fetchedVendor);
            return new ResponseEntity<>(savedVendor, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }
}
