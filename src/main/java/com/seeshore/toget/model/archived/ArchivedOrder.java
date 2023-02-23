package com.seeshore.toget.model.archived;

import com.seeshore.toget.model.Order;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "archived_order")
public class ArchivedOrder implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "order_date")
    private Date orderDate;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "user_id")
    private Long userId;

    public ArchivedOrder(Long itemId, Order order) {
        this.orderDate = order.getOrderDate();
        this.quantity = order.getQuantity();
        this.itemId = itemId;
        this.userId = order.getUser().getId();
    }

    public ArchivedOrder() {}

    public Long getId() {
        return id;
    }
}
