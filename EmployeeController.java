package com.officemanagement.officemanagement.controller;

import com.officemanagement.officemanagement.entity.Employee;
import com.officemanagement.officemanagement.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Employee> create(
            @Valid @RequestBody Employee employee,
            @RequestParam(required = false) List<Long> roleIds) {

        return ResponseEntity.ok(
                service.create(employee, roleIds)
        );
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getAll() {

        return ResponseEntity.ok(
                service.getAll()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getById(
            @PathVariable String id) {

        return ResponseEntity.ok(
                service.getById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> update(
            @PathVariable String id,
            @Valid @RequestBody Employee employee,
            @RequestParam(required = false) List<Long> roleIds) {

        return ResponseEntity.ok(
                service.update(id, employee, roleIds)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(
            @PathVariable String id) {

        service.delete(id);

        return ResponseEntity.ok(
                "Employee deleted successfully"
        );
    }
}