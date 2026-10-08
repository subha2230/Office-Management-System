package com.officemanagement.officemanagement.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "subcompanies")
public class Subcompany {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String subcompanyName;

    @Column(nullable = false, unique = true)
    private String subcompanyCode;

    private String description;

    @Column(nullable = false)
    private Boolean isActive = true;

    // Many Subcompanies belong to One Company
    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;


    // Default Constructor
    public Subcompany() {
    }


    // Getters and Setters

    public Long getId() {
        return id;
    }

    public String getSubcompanyName() {
        return subcompanyName;
    }

    public void setSubcompanyName(String subcompanyName) {
        this.subcompanyName = subcompanyName;
    }

    public String getSubcompanyCode() {
        return subcompanyCode;
    }

    public void setSubcompanyCode(String subcompanyCode) {
        this.subcompanyCode = subcompanyCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean active) {
        isActive = active;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
}