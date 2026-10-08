package com.officemanagement.officemanagement.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "job_roles")
public class JobRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Role code is required")
    @Column(name = "role_code", nullable = false, unique = true, length = 50)
    private String roleCode;

    @NotBlank(message = "Role name is required")
    @Column(name = "role_name", nullable = false, length = 100)
    private String roleName;

    private String description;

    @Column(nullable = false)
    private Boolean isActive = true;

    @ManyToMany(mappedBy = "jobRoles")
    @JsonIgnore
    private Set<Employee> employees = new HashSet<>();

    public JobRole() {
    }

    public Long getId() { return id; }
    public String getRoleCode() { return roleCode; }
    public void setRoleCode(String roleCode) { this.roleCode = roleCode; }
    public String getRoleName() { return roleName; }
    public void setRoleName(String roleName) { this.roleName = roleName; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean active) { isActive = active; }
    public Set<Employee> getEmployees() { return employees; }
    public void setEmployees(Set<Employee> employees) { this.employees = employees; }
}
