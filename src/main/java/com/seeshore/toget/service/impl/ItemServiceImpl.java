package com.seeshore.toget.service.impl;

import com.seeshore.toget.model.Item;
import com.seeshore.toget.repository.ItemRepository;
import com.seeshore.toget.service.IItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemServiceImpl implements IItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Override
    public List<Item> findAllItems() {
        return itemRepository.findAll();
    }
    @Override
    public Optional<Item> findItemById(Long itemId) {
        return itemRepository.findById(itemId);
    }
    @Override
    public Item saveItem(Item item) {
        return itemRepository.saveAndFlush(item);
    }
    @Override
    public void deleteItemById(Long itemId) {
        itemRepository.deleteById(itemId);
    }
    @Override
    public void deleteItem(Item item) {
        itemRepository.delete(item);
    }
    @Override
    public void deleteAllItems() {
        itemRepository.deleteAll();
    }
}
