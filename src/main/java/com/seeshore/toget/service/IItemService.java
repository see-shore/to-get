package com.seeshore.toget.service;

import com.seeshore.toget.model.Item;

import java.util.Optional;

public interface IItemService {

    public Optional<Item> findItemById(Long itemId);
    public Item saveItem(Item item);
}
