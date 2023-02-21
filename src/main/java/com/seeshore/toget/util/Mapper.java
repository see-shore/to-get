package com.seeshore.toget.util;

import com.seeshore.toget.model.Order;
import com.seeshore.toget.model.response.ResponseOrder;

import java.util.ArrayList;
import java.util.List;

public class Mapper {

    static public List<ResponseOrder> mapOrderToResponseObj(List<Order> orders) {
        List<ResponseOrder> responseOrders = new ArrayList<>();
        for (Order order : orders) {
            ResponseOrder responseOrder = new ResponseOrder(order);
            responseOrders.add(responseOrder);
        }

        return responseOrders;
    }
}
