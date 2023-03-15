package com.seeshore.toget.service.impl;

import com.seeshore.toget.model.Delivery;
import com.seeshore.toget.repository.DeliveryRepository;
import com.seeshore.toget.service.IDeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeliveryServiceImpl implements IDeliveryService {
    @Autowired
    private DeliveryRepository deliveryRepository;

    @Override
    public Delivery saveDelivery(Delivery delivery) {
        return deliveryRepository.save(delivery);
    }

    @Override
    public Delivery findMostRecentDelivery() {
        return deliveryRepository.findMostRecentDelivery();
    }

}
