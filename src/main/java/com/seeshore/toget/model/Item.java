package com.seeshore.toget.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.seeshore.toget.model.request.RequestItem;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "items")
public class Item implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private int price;

    @Column(name = "added_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date addedDate;

    @Column(name = "available")
    private int available;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "item", orphanRemoval = true)
    @JsonManagedReference(value = "item-order")
    private List<Order> orders = new ArrayList<>();

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id", nullable = true, updatable = false, insertable = true)
    @JsonBackReference(value = "vendor-item")
    private Vendor vendor;

    public Item(RequestItem requestItem, Vendor vendor) {
        try {
            this.name = requestItem.getName();
            this.price = requestItem.getPrice();
            this.addedDate = new Date();
            this.available = 1;
            this.vendor = vendor;
        } catch (Exception e) {
            throw new RuntimeException("One or more request body fields could not be parsed");
        }
    }

    public Item() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
    }

    public Date getAddedDate() {
        return addedDate;
    }

    public int getAvailable() {
        return available;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void dismissOrders() {
        this.orders.clear();
    }

    public void dismissVendor() {
        this.vendor.dismissItem(this);
        this.vendor = null;
    }
}
