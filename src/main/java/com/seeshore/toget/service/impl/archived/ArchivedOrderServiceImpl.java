package com.seeshore.toget.service.impl.archived;

import com.seeshore.toget.model.archived.ArchivedOrder;
import com.seeshore.toget.repository.archived.ArchivedOrderRepository;
import com.seeshore.toget.service.archived.IArchivedOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArchivedOrderServiceImpl implements IArchivedOrderService {
    @Autowired
    private ArchivedOrderRepository archivedOrderRepository;

    @Override
    public List<ArchivedOrder> findAllArchivedOrders() {
        return archivedOrderRepository.findAll();
    }
    @Override
    public ArchivedOrder saveArchivedOrder(ArchivedOrder order) {
        return archivedOrderRepository.saveAndFlush(order);
    }
}
