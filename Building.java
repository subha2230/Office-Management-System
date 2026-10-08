package com.officemanagement.officemanagement.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "buildings")
public class Building {

    @Id
    @Column(name = "id", nullable = false, unique = true, length = 20)
    private String id;

    @NotBlank(message = "Building code is required")
    @Column(name = "building_code", nullable = false, unique = true, length = 50)
    private String buildingCode;

    @NotBlank(message = "Building name is required")
    @Column(name = "building_name", nullable = false, length = 150)
    private String buildingName;

    private String address;

    @Column(nullable = false)
    private Boolean isActive = true;

    // Many Buildings belong to One Location
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id", nullable = false)
    @JsonIgnore
    private Location location;

    public Building() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBuildingCode() {
        return buildingCode;
    }

    public void setBuildingCode(String buildingCode) {
        this.buildingCode = buildingCode;
    }

    public String getBuildingName() {
        return buildingName;
    }

    public void setBuildingName(String buildingName) {
        this.buildingName = buildingName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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
}