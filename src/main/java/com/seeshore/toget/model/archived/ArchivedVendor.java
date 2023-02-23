package com.seeshore.toget.model.archived;

import com.seeshore.toget.model.Vendor;
import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "archived_vendor")
public class ArchivedVendor implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "phone")
    private String phone;

    @Column(name = "website")
    private String website;

    public ArchivedVendor(Vendor vendor) {
        this.name = vendor.getName();
        this.phone = vendor.getPhone();
        this.website = vendor.getWebsite();
    }

    public ArchivedVendor() {}

    public Long getId() {
        return id;
    }
}
