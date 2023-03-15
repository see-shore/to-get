package com.seeshore.toget.repository;

import com.seeshore.toget.model.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    @Query(value = "SELECT * FROM deliveries d ORDER BY d.created_date DESC LIMIT 1;", nativeQuery = true)
    Delivery findMostRecentDelivery();
}
