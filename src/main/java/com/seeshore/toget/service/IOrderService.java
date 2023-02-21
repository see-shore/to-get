package com.seeshore.toget.service;

import com.seeshore.toget.model.Order;

import java.util.List;

public interface IOrderService {

    public List<Order> findAllOrders();
    public Order saveOrder(Order order);
}
