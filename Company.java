package com.officemanagement.officemanagement.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "companies")
public class Company {

    @Id
    @Column(name = "id", nullable = false, unique = true, length = 20)
    private String id;

    @Column(nullable = false)
    private String companyName;

    @Column(nullable = false, unique = true)
    private String companyCode;

    private String industry;

    private String address;

    private String contactPerson;

    private String phone;

    private String email;

    @Column(nullable = false)
    private Boolean isActive = true;

    // ==========================================
    // MANY COMPANIES -> ONE LOCATION
    // ==========================================
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id", nullable = false)
    @JsonIgnore
    private Location location;

    // ==========================================
    // MANY COMPANIES -> ONE BUILDING
    // ==========================================
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "building_id", nullable = false)
    @JsonIgnore
    private Building building;

    // ==========================================
    // ONE COMPANY -> MANY SUBCOMPANIES
    // ==========================================
    @OneToMany(mappedBy = "company")
    @JsonIgnore
    private List<Subcompany> subcompanies;

    // ==========================================
    // DEFAULT CONSTRUCTOR
    // ==========================================
    public Company() {
    }

    // ==========================================
    // GETTERS AND SETTERS
    // ==========================================

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean active) {
        isActive = active;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Building getBuilding() {
        return building;
    }

    public void setBuilding(Building building) {
        this.building = building;
    }

    public List<Subcompany> getSubcompanies() {
        return subcompanies;
    }

    public void setSubcompanies(List<Subcompany> subcompanies) {
        this.subcompanies = subcompanies;
    }
}