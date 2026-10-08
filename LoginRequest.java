package com.officemanagement.officemanagement.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class LoginRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    // =========================
    // DEFAULT CONSTRUCTOR
    // =========================

    public LoginRequest() {
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