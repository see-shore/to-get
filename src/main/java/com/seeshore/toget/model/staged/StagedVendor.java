package com.seeshore.toget.model.staged;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "staged_vendors")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class StagedVendor implements Serializable {
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

    @Column(name = "available")
    private int available;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "vendor", fetch = FetchType.EAGER, orphanRemoval = true)
    @JsonManagedReference(value = "staged-vendor-item")
    @JsonIgnore
    private List<StagedItem> items = new ArrayList<>();

    public StagedVendor() {
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

    public void setName(String name) {
        this.name = name;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public List<StagedItem> getItems() {
        return items;
    }

    public int getAvailable() {
        return available;
    }

    public void setAvailable(int available) {
        this.available = available;
    }

    public void dismissStagedItem(StagedItem item) {
        this.items.remove(item);
    }
}
