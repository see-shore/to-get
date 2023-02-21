package com.seeshore.toget.controller;

import com.seeshore.toget.model.Item;
import com.seeshore.toget.model.Order;
import com.seeshore.toget.model.User;
import com.seeshore.toget.model.request.RequestOrder;
import com.seeshore.toget.service.IItemService;
import com.seeshore.toget.service.IOrderService;
import com.seeshore.toget.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Controller
public class OrderController {

    @Autowired
    private IOrderService orderService;
    @Autowired
    private IUserService userService;
    @Autowired
    private IItemService itemService;

    @PostMapping("/order/new")
    public ResponseEntity<Order> saveOrder(@RequestBody RequestOrder requestOrder) {
        try {
            Optional<Item> item = itemService.findItemById(requestOrder.getItemId());
            Optional<User> user = userService.findUserById(requestOrder.getUserId());
            if (item.isEmpty() || user.isEmpty()) {
                System.out.println("Provided item or user ID is unknown");
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "Provided item or user ID is unknown");
            }

            Order order = new Order(requestOrder, item.get(), user.get());
            Order savedOrder = orderService.saveOrder(order);
            return new ResponseEntity<>(savedOrder, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }
}
