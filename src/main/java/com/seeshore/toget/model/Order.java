package com.seeshore.toget.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "order_date")
    private Date orderDate;

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false, updatable = false, insertable = true)
    private Item item;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, updatable = false, insertable = true)
    private User user;

    public Long getId() {
        return id;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public Item getItem() {
        return item;
    }

    public User getUser() {
        return user;
    }
}
