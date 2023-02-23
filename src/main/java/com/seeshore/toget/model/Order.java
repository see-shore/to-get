package com.seeshore.toget.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "orders")
public class Order implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "order_date")
    private Date orderDate;

    @Column(name = "quantity")
    private int quantity;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "item_id", nullable = true, updatable = false, insertable = true)
    @JsonBackReference(value = "item-order")
    private Item item;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = true, updatable = false, insertable = true)
    @JsonBackReference(value = "user-order")
    private User user;

    public Order(int quantity, Item item, User user) {
        try {
            this.orderDate = new Date();
            this.item = item;
            this.user = user;
            this.quantity = quantity;
        } catch (Exception e) {
            throw new RuntimeException("One or more request body fields could not be parsed");
        }
    }

    public Order() {
    }

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

    public int getQuantity() {
        return quantity;
    }

    public void dismissItem() {
        this.item = null;
    }
}
