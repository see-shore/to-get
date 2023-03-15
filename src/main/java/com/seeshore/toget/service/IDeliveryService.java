package com.seeshore.toget.service;

import com.seeshore.toget.model.Delivery;

public interface IDeliveryService {
    public Delivery saveDelivery(Delivery delivery);

    public Delivery findMostRecentDelivery();
}
