package com.officemanagement.officemanagement.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @Column(name = "id", nullable = false, unique = true, length = 20)
    private String id;

    @NotBlank(message = "Employee code is required")
    @Column(name = "employee_code", nullable = false, unique = true, length = 50)
    private String employeeCode;

    @NotBlank(message = "Full name is required")
    @Column(name = "full_name", nullable = false, length = 150)
    private String fullName;

    @Email
    @Column(length = 150)
    private String email;

    private String department;

    // One Employee has One EmployeeProfile
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_id", unique = true)
    private EmployeeProfile profile;

    // One Employee can have Many Job Roles
    // One Job Role can belong to Many Employees
    @ManyToMany
    @JoinTable(
            name = "employee_role_mapping",
            joinColumns = @JoinColumn(name = "employee_id"),
            inverseJoinColumns = @JoinColumn(name = "job_role_id")
    )
    private Set<JobRole> jobRoles = new HashSet<>();

    public Employee() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmployeeCode() {
        return employeeCode;
    }

    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public EmployeeProfile getProfile() {
        return profile;
    }

    public void setProfile(EmployeeProfile profile) {
        this.profile = profile;

        if (profile != null) {
            profile.setEmployee(this);
        }
    }

    public Set<JobRole> getJobRoles() {
        return jobRoles;
    }

    public void setJobRoles(Set<JobRole> jobRoles) {
        this.jobRoles = jobRoles;
    }
}