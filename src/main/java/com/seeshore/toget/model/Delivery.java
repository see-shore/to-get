package com.seeshore.toget.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "deliveries")
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "uuid")
    private String uuid;

    @Column(name = "delivery_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date deliveryDate;

    @Column(name = "created_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    public Long getId() {
        return id;
    }

    public String getUuid() {
        return uuid;
    }

    public Date getDeliveryDate() {
        return deliveryDate;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public void setDeliveryDate(Date deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }
}
