package com.seeshore.toget.service;

import com.seeshore.toget.model.Vendor;

import java.util.List;
import java.util.Optional;

public interface IVendorService {

    public List<Vendor> findAllVendors();
    public Optional<Vendor> findVendorById(Long vendorId);
    public Vendor saveVendor(Vendor vendor);
    public void deleteVendorById(Long vendorId);
}
