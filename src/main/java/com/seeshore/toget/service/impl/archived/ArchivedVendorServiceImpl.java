package com.seeshore.toget.service.impl.archived;

import com.seeshore.toget.model.Vendor;
import com.seeshore.toget.model.archived.ArchivedVendor;
import com.seeshore.toget.repository.archived.ArchivedVendorRepository;
import com.seeshore.toget.service.archived.IArchivedVendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArchivedVendorServiceImpl implements IArchivedVendorService {
    @Autowired
    private ArchivedVendorRepository archivedVendorRepository;

    @Override
    public List<ArchivedVendor> findAllArchivedVendors() {
        return archivedVendorRepository.findAll();
    }

    @Override
    public Optional<ArchivedVendor> findArchivedVendorById(Long vendorId) {
        return archivedVendorRepository.findById(vendorId);
    }

    @Override
    public ArchivedVendor saveArchivedVendor(ArchivedVendor vendor) {
        return archivedVendorRepository.saveAndFlush(vendor);
    }

    @Override
    public void deleteArchivedVendorById(Long vendorId) {
        archivedVendorRepository.deleteById(vendorId);
    }
}
