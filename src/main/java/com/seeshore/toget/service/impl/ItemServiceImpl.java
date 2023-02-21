package com.seeshore.toget.service.impl;

import com.seeshore.toget.model.Item;
import com.seeshore.toget.repository.ItemRepository;
import com.seeshore.toget.service.IItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ItemServiceImpl implements IItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Override
    public Optional<Item> findItemById(Long itemId) {
        return itemRepository.findById(itemId);
    }
    @Override
    public Item saveItem(Item item) {
        return itemRepository.saveAndFlush(item);
    }
}
