package com.officemanagement.officemanagement.repository;

import com.officemanagement.officemanagement.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, String> {

    boolean existsByEmployeeCode(String employeeCode);
}