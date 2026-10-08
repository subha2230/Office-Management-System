package com.officemanagement.officemanagement.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterRequest {

    // =========================
    // USERNAME
    // =========================

    @NotBlank(message = "Username is required")
    @Size(
            min = 3,
            max = 50,
            message = "Username must be between 3 and 50 characters"
    )
    private String username;

    // =========================
    // EMAIL
    // =========================

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email")
    private String email;

    // =========================
    // PASSWORD
    // =========================

    @NotBlank(message = "Password is required")
    @Size(
            min = 6,
            message = "Password must be at least 6 characters"
    )
    private String password;

    // =========================
    // DEFAULT CONSTRUCTOR
    // =========================

    public RegisterRequest() {
    }

    // =========================
    // GET USERNAME
    // =========================

    public String getUsername() {
        return username;
    }

    // =========================
    // SET USERNAME
    // =========================

    public void setUsername(String username) {
        this.username = username;
    }

    // =========================
    // GET EMAIL
    // =========================

    public String getEmail() {
        return email;
    }

    // =========================
    // SET EMAIL
    // =========================

    public void setEmail(String email) {
        this.email = email;
    }

    // =========================
    // GET PASSWORD
    // =========================

    public String getPassword() {
        return password;
    }

    // =========================
    // SET PASSWORD
    // =========================

    public void setPassword(String password) {
        this.password = password;
    }
}