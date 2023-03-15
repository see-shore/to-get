package com.seeshore.toget.model.request;

public class RequestItem {
    private String name;
    private int price;
    private String units;
    private int pricePerUnit;
    private String description;
    private String imageUrl;
    private int available;
    private Long vendorId;

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
    }

    public String getUnits() {
        return units;
    }

    public int getPricePerUnit() {
        return pricePerUnit;
    }

    public String getDescription() {
        return description;
    }

    public int getAvailable() {
        return available;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public Long getVendorId() {
        return vendorId;
    }
}
