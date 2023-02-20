package com.seeshore.toget.service.impl;

import com.seeshore.toget.model.Item;
import com.seeshore.toget.repository.ItemRepository;
import com.seeshore.toget.service.IItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemServiceImpl implements IItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Override
    public Item saveItem(Item item) {
        return itemRepository.saveAndFlush(item);
    }
}
