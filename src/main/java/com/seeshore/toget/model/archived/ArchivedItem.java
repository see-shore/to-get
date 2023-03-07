package com.seeshore.toget.model.archived;

import com.seeshore.toget.model.Item;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "archived_item")
public class ArchivedItem implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private int price;

    @Column(name = "units")
    private String units;

    @Column(name = "added_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date addedDate;

    @Column(name = "vendor_id")
    private Long vendorId;

    public ArchivedItem(Long vendorId, Item item) {
        this.addedDate = item.getAddedDate();
        this.name = item.getName();
        this.price = item.getPrice();
        this.units = item.getUnits();
        this.vendorId = vendorId;
    }

    public ArchivedItem() {}

    public Long getId() {
        return id;
    }
}
