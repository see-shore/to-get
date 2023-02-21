package com.seeshore.toget.model.request;

public class RequestItem {
    private String name;
    private int price;
    private String addedDate;
    private int available;
    private Long vendorId;

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
    }

    public String getAddedDate() {
        return addedDate;
    }

    public int getAvailable() {
        return available;
    }

    public Long getVendorId() {
        return vendorId;
    }
}