package com.seeshore.toget.model;

import com.seeshore.toget.model.request.RequestItem;
import jakarta.persistence.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "items")
public class Item {

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

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "item")
    private List<Order> orders = new ArrayList<>();

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id", nullable = false, updatable = false, insertable = true)
    private Vendor vendor;

    public Item(RequestItem requestItem, Vendor vendor) {
        try {
            this.name = requestItem.getName();
            this.price = requestItem.getPrice();

            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
            this.addedDate = dateFormat.parse(requestItem.getAddedDate());

            this.available = requestItem.getAvailable();
            this.vendor = vendor;
        } catch (Exception e) {
            throw new RuntimeException("One or more request body fields could not be parsed");
        }
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
}
