package com.seeshore.toget.service.impl.archived;

import com.seeshore.toget.model.Item;
import com.seeshore.toget.model.archived.ArchivedItem;
import com.seeshore.toget.repository.archived.ArchivedItemRepository;
import com.seeshore.toget.service.archived.IArchivedItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArchivedItemServiceImpl implements IArchivedItemService {
    @Autowired
    private ArchivedItemRepository archivedItemRepository;

    @Override
    public List<ArchivedItem> findAllArchivedItems() {
        return archivedItemRepository.findAll();
    }
    @Override
    public Optional<ArchivedItem> findArchivedItemById(Long itemId) {
        return archivedItemRepository.findById(itemId);
    }
    @Override
    public ArchivedItem saveArchivedItem(ArchivedItem item) {
        return archivedItemRepository.saveAndFlush(item);
    }
    @Override
    public void deleteArchivedItemById(Long itemId) {
        archivedItemRepository.deleteById(itemId);
    }
    @Override
    public void deleteArchivedItem(ArchivedItem item) {
        archivedItemRepository.delete(item);
    }
}
