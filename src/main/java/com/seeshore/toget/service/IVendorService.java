package com.seeshore.toget.service;

import com.seeshore.toget.model.Vendor;

import java.util.List;

public interface IVendorService {

    public List<Vendor> findAllVendors();
    public Vendor saveVendor(Vendor vendor);
}
