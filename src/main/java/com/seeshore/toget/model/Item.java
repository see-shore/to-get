package com.seeshore.toget.model;

import jakarta.persistence.*;

import java.util.Date;

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
    private Date addedDate;

    @Column(name = "available")
    private int available;

    @ManyToOne
    @JoinColumn(name = "vendor_id", nullable = false, updatable = false, insertable = true)
    private Vendor vendor;

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
