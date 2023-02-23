package com.seeshore.toget.service.archived;

import com.seeshore.toget.model.archived.ArchivedItem;

import java.util.List;
import java.util.Optional;

public interface IArchivedItemService {
    public List<ArchivedItem> findAllArchivedItems();
    public Optional<ArchivedItem> findArchivedItemById(Long itemId);
    public ArchivedItem saveArchivedItem(ArchivedItem item);
    public void deleteArchivedItemById(Long itemId);
    public void deleteArchivedItem(ArchivedItem item);
}
