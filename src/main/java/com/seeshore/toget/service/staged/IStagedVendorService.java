package com.seeshore.toget.service.staged;

import com.seeshore.toget.model.staged.StagedVendor;

import java.util.List;
import java.util.Optional;

public interface IStagedVendorService {
    public List<StagedVendor> findAllStagedVendors();
    public Optional<StagedVendor> findStagedVendorById(Long vendorId);
    public StagedVendor saveStagedVendor(StagedVendor vendor);
    public void deleteStagedVendorById(Long vendorId);
}
