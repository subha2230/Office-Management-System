package com.officemanagement.officemanagement.controller;

import com.officemanagement.officemanagement.entity.JobRole;
import com.officemanagement.officemanagement.repository.BuildingRepository;
import com.officemanagement.officemanagement.repository.CompanyRepository;
import com.officemanagement.officemanagement.repository.EmployeeRepository;
import com.officemanagement.officemanagement.repository.JobRoleRepository;
import com.officemanagement.officemanagement.repository.LocationRepository;
import com.officemanagement.officemanagement.repository.SubcompanyRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {

    private final LocationRepository locationRepository;
    private final BuildingRepository buildingRepository;
    private final CompanyRepository companyRepository;
    private final SubcompanyRepository subcompanyRepository;
    private final EmployeeRepository employeeRepository;
    private final JobRoleRepository jobRoleRepository;


    public ReportController(
            LocationRepository locationRepository,
            BuildingRepository buildingRepository,
            CompanyRepository companyRepository,
            SubcompanyRepository subcompanyRepository,
            EmployeeRepository employeeRepository,
            JobRoleRepository jobRoleRepository
    ) {
        this.locationRepository = locationRepository;
        this.buildingRepository = buildingRepository;
        this.companyRepository = companyRepository;
        this.subcompanyRepository = subcompanyRepository;
        this.employeeRepository = employeeRepository;
        this.jobRoleRepository = jobRoleRepository;
    }


    // =========================================================
    // SUMMARY
    // =========================================================

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> summary() {

        Map<String, Object> result =
                new LinkedHashMap<>();

        result.put(
                "locations",
                locationRepository.count()
        );

        result.put(
                "buildings",
                buildingRepository.count()
        );

        result.put(
                "companies",
                companyRepository.count()
        );

        result.put(
                "subcompanies",
                subcompanyRepository.count()
        );

        result.put(
                "employees",
                employeeRepository.count()
        );

        result.put(
                "jobRoles",
                jobRoleRepository.count()
        );

        return ResponseEntity.ok(result);
    }


    // =========================================================
    // LOCATION-WISE
    // =========================================================

    @GetMapping("/location-wise")
    public ResponseEntity<List<Map<String, Object>>> locationWise() {

        List<Map<String, Object>> report =
                locationRepository.findAll()
                        .stream()
                        .map(location -> {

                            Map<String, Object> row =
                                    new LinkedHashMap<>();

                            row.put(
                                    "locationId",
                                    location.getId()
                            );

                            row.put(
                                    "locationCode",
                                    location.getLocationCode()
                            );

                            row.put(
                                    "locationName",
                                    location.getLocationName()
                            );

                            row.put(
                                    "buildingCount",
                                    buildingRepository
                                            .findByLocationId(
                                                    location.getId()
                                            )
                                            .size()
                            );

                            return row;
                        })
                        .toList();

        return ResponseEntity.ok(report);
    }


    // =========================================================
    // COMPANY-WISE
    // =========================================================

    @GetMapping("/company-wise")
    public ResponseEntity<List<Map<String, Object>>> companyWise() {

        List<Map<String, Object>> report =
                companyRepository.findAll()
                        .stream()
                        .map(company -> {

                            Map<String, Object> row =
                                    new LinkedHashMap<>();

                            row.put(
                                    "companyId",
                                    company.getId()
                            );

                            row.put(
                                    "companyCode",
                                    company.getCompanyCode()
                            );

                            row.put(
                                    "companyName",
                                    company.getCompanyName()
                            );

                            row.put(
                                    "industry",
                                    company.getIndustry()
                            );

                            row.put(
                                    "locationName",
                                    company.getLocation() != null
                                            ? company.getLocation().getLocationName()
                                            : null
                            );

                            row.put(
                                    "buildingName",
                                    company.getBuilding() != null
                                            ? company.getBuilding().getBuildingName()
                                            : null
                            );

                            row.put(
                                    "contactPerson",
                                    company.getContactPerson()
                            );

                            row.put(
                                    "phone",
                                    company.getPhone()
                            );

                            row.put(
                                    "email",
                                    company.getEmail()
                            );

                            row.put(
                                    "isActive",
                                    company.getIsActive()
                            );

                            return row;
                        })
                        .toList();

        return ResponseEntity.ok(report);
    }


    // =========================================================
    // SUBCOMPANY-WISE
    // =========================================================

    @GetMapping("/subcompany-wise")
    public ResponseEntity<List<Map<String, Object>>> subcompanyWise() {

        List<Map<String, Object>> report =
                subcompanyRepository.findAll()
                        .stream()
                        .map(subcompany -> {

                            Map<String, Object> row =
                                    new LinkedHashMap<>();

                            row.put(
                                    "subcompanyId",
                                    subcompany.getId()
                            );

                            row.put(
                                    "subcompanyCode",
                                    subcompany.getSubcompanyCode()
                            );

                            row.put(
                                    "subcompanyName",
                                    subcompany.getSubcompanyName()
                            );

                            row.put(
                                    "companyName",
                                    subcompany.getCompany() != null
                                            ? subcompany.getCompany().getCompanyName()
                                            : null
                            );

                            row.put(
                                    "description",
                                    subcompany.getDescription()
                            );

                            row.put(
                                    "isActive",
                                    subcompany.getIsActive()
                            );

                            return row;
                        })
                        .toList();

        return ResponseEntity.ok(report);
    }


    // =========================================================
    // ROLE-WISE
    // =========================================================

    @GetMapping("/role-wise")
    public ResponseEntity<List<Map<String, Object>>> roleWise() {

        List<Map<String, Object>> report =
                jobRoleRepository.findAll()
                        .stream()
                        .map(role -> {

                            Map<String, Object> row =
                                    new LinkedHashMap<>();

                            row.put(
                                    "roleCode",
                                    role.getRoleCode()
                            );

                            row.put(
                                    "roleName",
                                    role.getRoleName()
                            );

                            row.put(
                                    "employeeCount",
                                    role.getEmployees().size()
                            );

                            return row;
                        })
                        .toList();

        return ResponseEntity.ok(report);
    }


    // =========================================================
    // EMPLOYEE DIRECTORY
    // =========================================================

    @GetMapping("/employee-directory")
    public ResponseEntity<List<Map<String, Object>>> employeeDirectory() {

        List<Map<String, Object>> report =
                employeeRepository.findAll()
                        .stream()
                        .map(employee -> {

                            Map<String, Object> row =
                                    new LinkedHashMap<>();

                            row.put(
                                    "employeeId",
                                    employee.getEmployeeCode()
                            );

                            row.put(
                                    "fullName",
                                    employee.getFullName()
                            );

                            row.put(
                                    "email",
                                    employee.getEmail()
                            );

                            row.put(
                                    "department",
                                    employee.getDepartment()
                            );

                            row.put(
                                    "roles",
                                    employee.getJobRoles()
                                            .stream()
                                            .map(JobRole::getRoleName)
                                            .toList()
                            );

                            return row;
                        })
                        .toList();

        return ResponseEntity.ok(report);
    }
}