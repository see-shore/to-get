package com.seeshore.toget.service.impl;

import com.seeshore.toget.model.Order;
import com.seeshore.toget.repository.OrderRepository;
import com.seeshore.toget.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements IOrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<Order> findAllOrders() {
        return orderRepository.findAll();
    }
    @Override
    public Order saveOrder(Order order) {
        return orderRepository.saveAndFlush(order);
    }
}
