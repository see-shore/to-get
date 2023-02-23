package com.seeshore.toget.service.impl;

import com.seeshore.toget.model.Vendor;
import com.seeshore.toget.repository.VendorRepository;
import com.seeshore.toget.service.IVendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VendorServiceImpl implements IVendorService {

    @Autowired
    VendorRepository vendorRepository;

    @Override
    public List<Vendor> findAllVendors() {
        return vendorRepository.findAll();
    }

    @Override
    public Optional<Vendor> findVendorById(Long vendorId) {
        return vendorRepository.findById(vendorId);
    }

    @Override
    public Vendor saveVendor(Vendor vendor) {
        return vendorRepository.saveAndFlush(vendor);
    }

    @Override
    public void deleteVendorById(Long vendorId) {
        vendorRepository.deleteById(vendorId);
    }

    @Override
    public void deleteAllVendors() {
        vendorRepository.deleteAll();
    }
}
