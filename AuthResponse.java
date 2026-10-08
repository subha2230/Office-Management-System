package com.officemanagement.officemanagement.dto;

public class AuthResponse {

    private String message;
    private String token;
    private Long id;
    private String username;
    private String email;
    private String role;

    // =========================
    // DEFAULT CONSTRUCTOR
    // =========================

    public AuthResponse() {
    }

    // =========================
    // PARAMETERIZED CONSTRUCTOR
    // =========================

    public AuthResponse(
            String message,
            String token,
            Long id,
            String username,
            String email,
            String role
    ) {
        this.message = message;
        this.token = token;
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
    }

    // =========================
    // GETTERS & SETTERS
    // =========================

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}