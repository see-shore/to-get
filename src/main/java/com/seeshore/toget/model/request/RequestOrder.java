package com.seeshore.toget.model.request;

public class RequestOrder {

    private Long itemId;
    private Long userId;
    private int quantity;

    public Long getItemId() {
        return itemId;
    }

    public Long getUserId() {
        return userId;
    }

    public int getQuantity() {
        return quantity;
    }
}
