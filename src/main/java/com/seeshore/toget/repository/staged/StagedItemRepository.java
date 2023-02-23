package com.seeshore.toget.repository.staged;

import com.seeshore.toget.model.staged.StagedItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StagedItemRepository extends JpaRepository<StagedItem, Long> {
}
