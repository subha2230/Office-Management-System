package com.officemanagement.officemanagement.service;

import com.officemanagement.officemanagement.entity.Employee;
import com.officemanagement.officemanagement.entity.JobRole;
import com.officemanagement.officemanagement.repository.EmployeeRepository;
import com.officemanagement.officemanagement.repository.JobRoleRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final JobRoleRepository jobRoleRepository;

    public EmployeeService(
            EmployeeRepository employeeRepository,
            JobRoleRepository jobRoleRepository) {

        this.employeeRepository = employeeRepository;
        this.jobRoleRepository = jobRoleRepository;
    }

    // CREATE EMPLOYEE
    public Employee create(Employee employee, List<Long> roleIds) {

        if (employeeRepository.existsByEmployeeCode(employee.getEmployeeCode())) {
            throw new RuntimeException("Employee code already exists");
        }

        // Generate Employee Primary Key
        employee.setId(generateEmployeeId());

        employee.setJobRoles(resolveRoles(roleIds));

        return employeeRepository.save(employee);
    }

    // GET ALL EMPLOYEES
    public List<Employee> getAll() {
        return employeeRepository.findAll();
    }

    // GET EMPLOYEE BY ID
    public Employee getById(String id) {

        return employeeRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Employee not found with id: " + id
                        )
                );
    }

    // UPDATE EMPLOYEE
    public Employee update(
            String id,
            Employee updated,
            List<Long> roleIds) {

        Employee existing = getById(id);

        if (!existing.getEmployeeCode().equals(updated.getEmployeeCode())
                && employeeRepository.existsByEmployeeCode(
                updated.getEmployeeCode())) {

            throw new RuntimeException("Employee code already exists");
        }

        existing.setEmployeeCode(updated.getEmployeeCode());
        existing.setFullName(updated.getFullName());
        existing.setEmail(updated.getEmail());
        existing.setDepartment(updated.getDepartment());
        existing.setProfile(updated.getProfile());
        existing.setJobRoles(resolveRoles(roleIds));

        return employeeRepository.save(existing);
    }

    // DELETE EMPLOYEE
    public void delete(String id) {
        employeeRepository.delete(getById(id));
    }

    // FIND JOB ROLES
    private Set<JobRole> resolveRoles(List<Long> roleIds) {

        if (roleIds == null || roleIds.isEmpty()) {
            return new HashSet<>();
        }

        return new HashSet<>(
                jobRoleRepository.findAllById(roleIds)
        );
    }

    // GENERATE EMPLOYEE PRIMARY KEY
    private String generateEmployeeId() {

        long employeeNumber = employeeRepository.count() + 421;

        return "EMP" + employeeNumber;
    }
}