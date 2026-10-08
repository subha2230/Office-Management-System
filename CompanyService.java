package com.officemanagement.officemanagement.service;

import com.officemanagement.officemanagement.entity.Building;
import com.officemanagement.officemanagement.entity.Company;
import com.officemanagement.officemanagement.entity.Location;
import com.officemanagement.officemanagement.repository.BuildingRepository;
import com.officemanagement.officemanagement.repository.CompanyRepository;
import com.officemanagement.officemanagement.repository.LocationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final LocationRepository locationRepository;
    private final BuildingRepository buildingRepository;

    public CompanyService(
            CompanyRepository companyRepository,
            LocationRepository locationRepository,
            BuildingRepository buildingRepository
    ) {
        this.companyRepository = companyRepository;
        this.locationRepository = locationRepository;
        this.buildingRepository = buildingRepository;
    }

    // ==========================================
    // CREATE COMPANY
    // ==========================================

    public Company createCompany(
            Company company,
            Long locationId,
            String buildingId
    ) {

        // Check duplicate company code
        if (companyRepository.existsByCompanyCode(
                company.getCompanyCode()
        )) {

            throw new RuntimeException(
                    "Company code already exists"
            );
        }

        // Find Location
        Location location =
                locationRepository.findById(locationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Location not found with id: "
                                                + locationId
                                )
                        );

        // Find Building
        Building building =
                buildingRepository.findById(buildingId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Building not found with id: "
                                                + buildingId
                                )
                        );

        // Check Building belongs to Location
        if (!building.getLocation()
                .getId()
                .equals(locationId)) {

            throw new RuntimeException(
                    "Selected building does not belong to selected location"
            );
        }
        // Generate Company ID
        String companyId =
                String.format(
                        "COM%03d",
                        companyRepository.count() + 1
                );

        company.setId(companyId);

        // Connect Company -> Location
        company.setLocation(location);

        // Connect Company -> Building
        company.setBuilding(building);

        // Save
        return companyRepository.save(company);
    }

    // ==========================================
    // GET ALL COMPANIES
    // ==========================================

    public List<Company> getAllCompanies() {

        return companyRepository.findAll();
    }

    // ==========================================
    // GET COMPANY BY ID
    // ==========================================

    public Company getCompanyById(String id) {

        return companyRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Company not found with id: " + id
                        )
                );
    }

    // ==========================================
    // UPDATE COMPANY
    // ==========================================

    public Company updateCompany(
            String id,
            Company updatedCompany,
            Long locationId,
            String buildingId
    ) {

        Company company =
                companyRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Company not found"
                                )
                        );

        Location location =
                locationRepository.findById(locationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Location not found"
                                )
                        );

        Building building =
                buildingRepository.findById(buildingId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Building not found"
                                )
                        );

        // Check Building -> Location
        if (!building.getLocation()
                .getId()
                .equals(locationId)) {

            throw new RuntimeException(
                    "Selected building does not belong to selected location"
            );
        }

        // Check duplicate company code
        if (!company.getCompanyCode()
                .equals(updatedCompany.getCompanyCode())
                && companyRepository.existsByCompanyCode(
                updatedCompany.getCompanyCode()
        )) {

            throw new RuntimeException(
                    "Company code already exists"
            );
        }

        company.setCompanyName(
                updatedCompany.getCompanyName()
        );

        company.setCompanyCode(
                updatedCompany.getCompanyCode()
        );

        company.setIndustry(
                updatedCompany.getIndustry()
        );

        company.setAddress(
                updatedCompany.getAddress()
        );

        company.setContactPerson(
                updatedCompany.getContactPerson()
        );

        company.setPhone(
                updatedCompany.getPhone()
        );

        company.setEmail(
                updatedCompany.getEmail()
        );

        company.setIsActive(
                updatedCompany.getIsActive()
        );

        company.setLocation(location);

        company.setBuilding(building);

        return companyRepository.save(company);
    }

    // ==========================================
    // DELETE COMPANY
    // ==========================================

    public void deleteCompany(String id) {

        Company company =
                companyRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Company not found"
                                )
                        );

        companyRepository.delete(company);
    }
}