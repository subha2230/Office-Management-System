package com.officemanagement.officemanagement.service;

import com.officemanagement.officemanagement.entity.JobRole;
import com.officemanagement.officemanagement.repository.JobRoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobRoleService {
    private final JobRoleRepository repository;

    public JobRoleService(JobRoleRepository repository) {
        this.repository = repository;
    }

    public JobRole create(JobRole role) {
        if (repository.existsByRoleCode(role.getRoleCode())) {
            throw new RuntimeException("Role code already exists");
        }
        return repository.save(role);
    }

    public List<JobRole> getAll() { return repository.findAll(); }

    public JobRole getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job role not found with id: " + id));
    }
}
