package com.officemanagement.officemanagement.controller;

import com.officemanagement.officemanagement.entity.Subcompany;
import com.officemanagement.officemanagement.service.SubcompanyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subcompanies")
@CrossOrigin(origins = "http://localhost:5173")
public class SubcompanyController {

    private final SubcompanyService subcompanyService;

    public SubcompanyController(
            SubcompanyService subcompanyService
    ) {
        this.subcompanyService = subcompanyService;
    }

    // ==========================================
    // CREATE SUBCOMPANY
    // ==========================================

    @PostMapping
    public ResponseEntity<Subcompany> createSubcompany(
            @RequestBody Subcompany subcompany,
            @RequestParam String companyId
    ) {

        return ResponseEntity.ok(
                subcompanyService.createSubcompany(
                        subcompany,
                        companyId
                )
        );
    }

    // ==========================================
    // GET ALL SUBCOMPANIES
    // ==========================================

    @GetMapping
    public ResponseEntity<List<Subcompany>> getAllSubcompanies() {

        return ResponseEntity.ok(
                subcompanyService.getAllSubcompanies()
        );
    }

    // ==========================================
    // GET SUBCOMPANY BY ID
    // ==========================================

    @GetMapping("/{id}")
    public ResponseEntity<Subcompany> getSubcompanyById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                subcompanyService.getSubcompanyById(id)
        );
    }

    // ==========================================
    // UPDATE SUBCOMPANY
    // ==========================================

    @PutMapping("/{id}")
    public ResponseEntity<Subcompany> updateSubcompany(
            @PathVariable Long id,
            @RequestBody Subcompany subcompany,
            @RequestParam String companyId
    ) {

        return ResponseEntity.ok(
                subcompanyService.updateSubcompany(
                        id,
                        subcompany,
                        companyId
                )
        );
    }

    // ==========================================
    // DELETE SUBCOMPANY
    // ==========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSubcompany(
            @PathVariable Long id
    ) {

        subcompanyService.deleteSubcompany(id);

        return ResponseEntity.ok(
                "Subcompany deleted successfully"
        );
    }
}