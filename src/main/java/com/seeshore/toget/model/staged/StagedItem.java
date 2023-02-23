package com.seeshore.toget.model.staged;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.seeshore.toget.model.request.RequestItem;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "staged_items")
public class StagedItem implements Serializable {

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

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id", nullable = true, updatable = false, insertable = true)
    @JsonBackReference(value = "staged-vendor-item")
    private StagedVendor vendor;

    public StagedItem(RequestItem requestItem, StagedVendor vendor) {
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

    public StagedItem() {
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

    public StagedVendor getStagedVendor() {
        return vendor;
    }

    public void setAvailable(int available) {
        this.available = available;
    }

    public void dismissStagedVendor() {
        this.vendor.dismissStagedItem(this);
        this.vendor = null;
    }
}
