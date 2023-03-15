package com.seeshore.toget.controller;

import com.seeshore.toget.model.Delivery;
import com.seeshore.toget.service.IDeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.UUID;

@Controller
@CrossOrigin
public class DeliveryController {
    @Autowired
    private IDeliveryService deliveryService;

    @PostMapping("/delivery")
    public ResponseEntity<Delivery> saveNewDelivery(@RequestBody Delivery delivery) {
        try {
            delivery.setUuid(UUID.randomUUID().toString());
            delivery.setCreatedDate(new Date());
            Delivery savedDelivery = deliveryService.saveDelivery(delivery);
            return new ResponseEntity<>(savedDelivery, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }

    @GetMapping("/delivery")
    public ResponseEntity<Delivery> findMostRecentDelivery() {
        try {
            Delivery delivery = deliveryService.findMostRecentDelivery();
            return new ResponseEntity<>(delivery, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }
}
