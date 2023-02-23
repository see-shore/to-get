package com.seeshore.toget.service.impl.staged;

import com.seeshore.toget.model.staged.StagedItem;
import com.seeshore.toget.repository.staged.StagedItemRepository;
import com.seeshore.toget.service.staged.IStagedItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StagedItemServiceImpl implements IStagedItemService {

    @Autowired
    private StagedItemRepository stagedItemRepository;

    @Override
    public List<StagedItem> findAllStagedItems() {
        return stagedItemRepository.findAll();
    }
    @Override
    public Optional<StagedItem> findStagedItemById(Long itemId) {
        return stagedItemRepository.findById(itemId);
    }
    @Override
    public StagedItem saveStagedItem(StagedItem item) {
        return stagedItemRepository.saveAndFlush(item);
    }
    @Override
    public void deleteStagedItemById(Long itemId) {
        stagedItemRepository.deleteById(itemId);
    }
    @Override
    public void deleteStagedItem(StagedItem item) {
        stagedItemRepository.delete(item);
    }
}
