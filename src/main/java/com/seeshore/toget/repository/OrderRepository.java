package com.seeshore.toget.repository;

import com.seeshore.toget.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
