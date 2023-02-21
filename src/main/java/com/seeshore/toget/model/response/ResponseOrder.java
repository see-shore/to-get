package com.seeshore.toget.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.seeshore.toget.model.Order;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.io.Serializable;
import java.util.Date;

public class ResponseOrder implements Serializable {
    @JsonProperty("id")
    private Long id;
    @JsonProperty("orderDate")
    private String orderDate;
    @JsonProperty("quantity")
    private int quantity;
    @JsonProperty("itemId")
    private Long itemId;
    @JsonProperty("userId")
    private Long userId;

    public ResponseOrder(Order order) {
        setId(order.getId());
        setOrderDate(order.getOrderDate());
        setQuantity(order.getQuantity());
        setItemId(order.getItem().getId());
        setUserId(order.getUser().getId());
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate.toString();
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
