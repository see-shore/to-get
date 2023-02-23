package com.seeshore.toget.service.archived;

import com.seeshore.toget.model.archived.ArchivedVendor;

import java.util.List;
import java.util.Optional;

public interface IArchivedVendorService {
    public List<ArchivedVendor> findAllArchivedVendors();
    public Optional<ArchivedVendor> findArchivedVendorById(Long vendorId);
    public ArchivedVendor saveArchivedVendor(ArchivedVendor vendor);
    public void deleteArchivedVendorById(Long vendorId);
}
