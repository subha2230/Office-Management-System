package com.officemanagement.officemanagement.repository;

import com.officemanagement.officemanagement.entity.JobRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRoleRepository extends JpaRepository<JobRole, Long> {
    boolean existsByRoleCode(String roleCode);
}
