package com.officemanagement.officemanagement.controller;

import com.officemanagement.officemanagement.entity.Company;
import com.officemanagement.officemanagement.service.CompanyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
@CrossOrigin(origins = "http://localhost:5173")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    // ==========================================
    // CREATE COMPANY
    // ==========================================

    @PostMapping
    public ResponseEntity<Company> createCompany(
            @RequestBody Company company,
            @RequestParam Long locationId,
            @RequestParam String buildingId
    ) {

        Company savedCompany =
                companyService.createCompany(
                        company,
                        locationId,
                        buildingId
                );

        return ResponseEntity.ok(savedCompany);
    }

    // ==========================================
    // GET ALL COMPANIES
    // ==========================================

    @GetMapping
    public ResponseEntity<List<Company>> getAllCompanies() {

        return ResponseEntity.ok(
                companyService.getAllCompanies()
        );
    }

    // ==========================================
    // GET COMPANY BY ID
    // ==========================================

    @GetMapping("/{id}")
    public ResponseEntity<Company> getCompanyById(
            @PathVariable String id
    ) {

        return ResponseEntity.ok(
                companyService.getCompanyById(id)
        );
    }

    // ==========================================
    // UPDATE COMPANY
    // ==========================================

    @PutMapping("/{id}")
    public ResponseEntity<Company> updateCompany(
            @PathVariable String id,
            @RequestBody Company company,
            @RequestParam Long locationId,
            @RequestParam String buildingId
    ) {

        return ResponseEntity.ok(
                companyService.updateCompany(
                        id,
                        company,
                        locationId,
                        buildingId
                )
        );
    }

    // ==========================================
    // DELETE COMPANY
    // ==========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCompany(
            @PathVariable String id
    ) {

        companyService.deleteCompany(id);

        return ResponseEntity.ok(
                "Company deleted successfully"
        );
    }
}