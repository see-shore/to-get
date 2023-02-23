package com.seeshore.toget.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.seeshore.toget.model.staged.StagedVendor;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "vendors")
public class Vendor implements Serializable {

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

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "vendor", fetch = FetchType.EAGER, orphanRemoval = true)
    @JsonManagedReference(value = "vendor-item")
    private List<Item> items = new ArrayList<>();

    public Vendor(StagedVendor stagedVendor) {
        this.name = stagedVendor.getName();
        this.phone = stagedVendor.getPhone();
        this.website = stagedVendor.getWebsite();
    }

    public Vendor() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPhone() {
        return phone;
    }

    public String getWebsite() {
        return website;
    }

    public List<Item> getItems() {
        return items;
    }

    public void dismissItem(Item item) {
        this.items.remove(item);
    }
}
