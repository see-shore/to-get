package com.seeshore.toget.service.impl.staged;

import com.seeshore.toget.model.Vendor;
import com.seeshore.toget.model.staged.StagedVendor;
import com.seeshore.toget.repository.staged.StagedVendorRepository;
import com.seeshore.toget.service.staged.IStagedVendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StagedVendorServiceImpl implements IStagedVendorService {
    @Autowired
    private StagedVendorRepository stagedVendorRepository;

    @Override
    public List<StagedVendor> findAllStagedVendors() {
        return stagedVendorRepository.findAll();
    }

    @Override
    public Optional<StagedVendor> findStagedVendorById(Long vendorId) {
        return stagedVendorRepository.findById(vendorId);
    }

    @Override
    public StagedVendor saveStagedVendor(StagedVendor vendor) {
        return stagedVendorRepository.saveAndFlush(vendor);
    }

    @Override
    public void deleteStagedVendorById(Long vendorId) {
        stagedVendorRepository.deleteById(vendorId);
    }
}
