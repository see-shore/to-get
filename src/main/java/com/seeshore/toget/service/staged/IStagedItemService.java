package com.seeshore.toget.service.staged;

import com.seeshore.toget.model.staged.StagedItem;

import java.util.List;
import java.util.Optional;

public interface IStagedItemService {
    public List<StagedItem> findAllStagedItems();
    public Optional<StagedItem> findStagedItemById(Long itemId);
    public StagedItem saveStagedItem(StagedItem item);
    public void deleteStagedItemById(Long itemId);
    public void deleteStagedItem(StagedItem item);
}
