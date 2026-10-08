package com.officemanagement.officemanagement.repository;

import com.officemanagement.officemanagement.entity.EmployeeProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeProfileRepository extends JpaRepository<EmployeeProfile, Long> {
}
