package com.seeshore.toget.service.archived;

import com.seeshore.toget.model.Order;
import com.seeshore.toget.model.archived.ArchivedOrder;

import java.util.List;

public interface IArchivedOrderService {
    public List<ArchivedOrder> findAllArchivedOrders();
    public ArchivedOrder saveArchivedOrder(ArchivedOrder order);
}
