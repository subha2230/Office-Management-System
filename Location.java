package com.officemanagement.officemanagement.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "locations")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Location code is required")
    @Column(name = "location_code", nullable = false, unique = true, length = 50)
    private String locationCode;

    @NotBlank(message = "Location name is required")
    @Column(name = "location_name", nullable = false, length = 150)
    private String locationName;

    @NotNull(message = "Head office is required")
    @Column(name = "head_office", nullable = false)
    private Boolean headOffice;

    @NotNull(message = "WhatsApp required is required")
    @Column(name = "whatsapp_required", nullable = false)
    private Boolean whatsappRequired;

    @NotNull(message = "Teams required is required")
    @Column(name = "teams_required", nullable = false)
    private Boolean teamsRequired;

    @NotNull(message = "Volunteer flow required is required")
    @Column(name = "volunteer_flow_required", nullable = false)
    private Boolean volunteerFlowRequired;

    @NotNull(message = "ESSL reconcile is required")
    @Column(name = "essl_reconcile", nullable = false)
    private Boolean esslReconcile;

    @Column(name = "device_type", length = 50)
    private String deviceType;

    @Column(name = "in_out_location_name", length = 150)
    private String inOutLocationName;

    // Filled automatically by the server from the logged-in admin —
    // never set by the client / form.
    @Column(name = "created_by", length = 100)
    private String createdBy;

    @Column(name = "updated_by", length = 100)
    private String updatedBy;

    // One Location has Many Buildings
    @OneToMany(mappedBy = "location")
    @JsonIgnore
    private List<Building> buildings;

    // Default Constructor
    public Location() {
    }

    // Constructor
    public Location(
            String locationCode,
            String locationName,
            Boolean headOffice,
            Boolean whatsappRequired,
            Boolean teamsRequired,
            Boolean volunteerFlowRequired,
            Boolean esslReconcile,
            String deviceType,
            String inOutLocationName
    ) {
        this.locationCode = locationCode;
        this.locationName = locationName;
        this.headOffice = headOffice;
        this.whatsappRequired = whatsappRequired;
        this.teamsRequired = teamsRequired;
        this.volunteerFlowRequired = volunteerFlowRequired;
        this.esslReconcile = esslReconcile;
        this.deviceType = deviceType;
        this.inOutLocationName = inOutLocationName;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocationCode() {
        return locationCode;
    }

    public void setLocationCode(String locationCode) {
        this.locationCode = locationCode;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public Boolean getHeadOffice() {
        return headOffice;
    }

    public void setHeadOffice(Boolean headOffice) {
        this.headOffice = headOffice;
    }

    public Boolean getWhatsappRequired() {
        return whatsappRequired;
    }

    public void setWhatsappRequired(Boolean whatsappRequired) {
        this.whatsappRequired = whatsappRequired;
    }

    public Boolean getTeamsRequired() {
        return teamsRequired;
    }

    public void setTeamsRequired(Boolean teamsRequired) {
        this.teamsRequired = teamsRequired;
    }

    public Boolean getVolunteerFlowRequired() {
        return volunteerFlowRequired;
    }

    public void setVolunteerFlowRequired(Boolean volunteerFlowRequired) {
        this.volunteerFlowRequired = volunteerFlowRequired;
    }

    public Boolean getEsslReconcile() {
        return esslReconcile;
    }

    public void setEsslReconcile(Boolean esslReconcile) {
        this.esslReconcile = esslReconcile;
    }

    public String getDeviceType() {
        return deviceType;
    }

    public void setDeviceType(String deviceType) {
        this.deviceType = deviceType;
    }

    public String getInOutLocationName() {
        return inOutLocationName;
    }

    public void setInOutLocationName(String inOutLocationName) {
        this.inOutLocationName = inOutLocationName;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }
}