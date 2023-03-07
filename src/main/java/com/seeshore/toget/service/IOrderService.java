package com.seeshore.toget.service;

import com.seeshore.toget.model.Order;

import java.util.List;
import java.util.Optional;

public interface IOrderService {

    public List<Order> findAllOrders();
    public Optional<Order> findOrderById(Long orderId);
    public Order saveOrder(Order order);
    public void deleteOrder(Long orderId);
}
