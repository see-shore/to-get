package com.seeshore.toget.service;

import com.seeshore.toget.model.Item;

import java.util.List;
import java.util.Optional;

public interface IItemService {
    public List<Item> findAllItems();
    public Optional<Item> findItemById(Long itemId);
    public Item saveItem(Item item);
    public void deleteItemById(Long itemId);
    public void deleteItem(Item item);
}
