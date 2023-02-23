package com.seeshore.toget.repository.archived;

import com.seeshore.toget.model.archived.ArchivedOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArchivedOrderRepository extends JpaRepository<ArchivedOrder, Long> {
}
