package com.seeshore.toget.model.request;

public class RequestOrder {
    private String orderDate;
    private Long itemId;
    private Long userId;

    public String getOrderDate() {
        return orderDate;
    }

    public Long getItemId() {
        return itemId;
    }

    public Long getUserId() {
        return userId;
    }
}
