package com.officemanagement.officemanagement.controller;

import com.officemanagement.officemanagement.entity.JobRole;
import com.officemanagement.officemanagement.service.JobRoleService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-roles")
@CrossOrigin(origins = "http://localhost:5173")
public class JobRoleController {
    private final JobRoleService service;

    public JobRoleController(JobRoleService service) { this.service = service; }

    @PostMapping
    public ResponseEntity<JobRole> create(@Valid @RequestBody JobRole role) {
        return ResponseEntity.ok(service.create(role));
    }

    @GetMapping
    public ResponseEntity<List<JobRole>> getAll() { return ResponseEntity.ok(service.getAll()); }

    @GetMapping("/{id}")
    public ResponseEntity<JobRole> getById(@PathVariable Long id) { return ResponseEntity.ok(service.getById(id)); }
}
