package com.seeshore.toget.repository.archived;

import com.seeshore.toget.model.archived.ArchivedItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArchivedItemRepository extends JpaRepository<ArchivedItem, Long> {
}
