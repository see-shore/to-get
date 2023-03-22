package com.seeshore.toget.controller;

import com.seeshore.toget.model.Item;
import com.seeshore.toget.model.Order;
import com.seeshore.toget.model.User;
import com.seeshore.toget.model.request.RequestOrder;
import com.seeshore.toget.model.response.ResponseOrder;
import com.seeshore.toget.service.IItemService;
import com.seeshore.toget.service.IOrderService;
import com.seeshore.toget.service.IUserService;
import com.seeshore.toget.util.Mapper;
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
public class OrderController {

    @Autowired
    private IOrderService orderService;
    @Autowired
    private IUserService userService;
    @Autowired
    private IItemService itemService;

    // Create a new order
    @PostMapping("/order/new")
    public ResponseEntity<Order> saveOrder(@RequestBody RequestOrder requestOrder) {
        try {
            Order savedOrder = saveOrderHelper(requestOrder);
            return new ResponseEntity<>(savedOrder, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }

    // Create new orders (batch)
    @PostMapping("/order/new/batch")
    public ResponseEntity<List<Order>> saveOrders(@RequestBody List<RequestOrder> requestOrders,
                                                  @RequestParam int orderTotal) {
        try {
            if (requestOrders.isEmpty()) {
                System.out.println("No orders were provided");
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "No orders were provided");
            }

            Long userId = requestOrders.get(0).getUserId();
            Optional<User> user = userService.findUserById(userId);
            if (user.isEmpty()) {
                System.out.println("Unknown user provided");
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "Unknown user provided");
            }
            User fetchedUser = user.get();
            fetchedUser.setOrderTotal(orderTotal);
            userService.saveUser(fetchedUser);

            List<Order> orders = new ArrayList<>();
            for (RequestOrder requestOrder : requestOrders) {
                Order savedOrder = saveOrderHelper(requestOrder);
                orders.add(savedOrder);
            }

            return new ResponseEntity<>(orders, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }

    // Fetch all orders of one user
    @GetMapping("/order")
    @ResponseBody
    public List<ResponseOrder> findAllOrdersByUser(@RequestParam Long userId) {
        try {
            Optional<User> user = userService.findUserById(userId);
            if (user.isEmpty()) {
                System.out.println("Provided user ID is unknown");
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "Provided user ID is unknown");
            }

            List<Order> orders = new ArrayList<>(user.get().getOrders());
            return Mapper.mapOrderToResponseObj(orders);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }

    // Fetch all orders
    @GetMapping("/order/all")
    @ResponseBody
    public List<ResponseOrder> findAllOrders() {
        try {
            List<Order> orders = new ArrayList<>(orderService.findAllOrders());
            return Mapper.mapOrderToResponseObj(orders);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }

    // Delete an order
    @DeleteMapping("/order")
    public ResponseEntity<String> deleteOrder(@RequestParam Long orderId) {
        try {
            Optional<Order> orderRecord = orderService.findOrderById(orderId);
            if (orderRecord.isEmpty()) {
                System.out.println("Provided order ID is unknown");
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "Provided order ID is unknown");
            }

            Order fetchedOrder = orderRecord.get();
            User user = fetchedOrder.getUser();
            Item item = fetchedOrder.getItem();
            int subTotal = item.getPricePerUnit() * fetchedOrder.getQuantity();
            user.deleteFromOrders(orderId);
            user.subtractFromTotal(subTotal);

            fetchedOrder.dismissItem();
            fetchedOrder.dismissUser();

            userService.saveUser(user);
            return ResponseEntity.status(HttpStatus.OK)
                    .body("Successfully deleted order with ID: " + orderId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Internal server error", e);
        }
    }

    // Order save helper
    public Order saveOrderHelper(RequestOrder requestOrder) {
        Optional<Item> item = itemService.findItemById(requestOrder.getItemId());
        Optional<User> user = userService.findUserById(requestOrder.getUserId());
        if (item.isEmpty() || user.isEmpty()) {
            System.out.println("Provided item or user ID is unknown");
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Provided item or user ID is unknown");
        }

        Order order = new Order(requestOrder.getQuantity(), item.get(), user.get());
        return orderService.saveOrder(order);
    }
}
