package com.officemanagement.officemanagement.controller;

import com.officemanagement.officemanagement.dto.RoleUpdateRequest;
import com.officemanagement.officemanagement.entity.Role;
import com.officemanagement.officemanagement.entity.User;
import com.officemanagement.officemanagement.repository.UserRepository;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(
        origins = "http://localhost:5173",
        methods = {
                RequestMethod.GET,
                RequestMethod.POST,
                RequestMethod.PUT,
                RequestMethod.DELETE,
                RequestMethod.OPTIONS
        }
)
public class AdminController {

    private final UserRepository userRepository;

    // =========================
    // CONSTRUCTOR
    // =========================

    public AdminController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // =========================
    // ADMIN DASHBOARD
    // =========================

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> dashboard() {

        long totalUsers = userRepository.count();

        long totalAdmins = userRepository.findAll()
                .stream()
                .filter(user -> user.getRole() == Role.ADMIN)
                .count();

        long totalNormalUsers = userRepository.findAll()
                .stream()
                .filter(user -> user.getRole() == Role.USER)
                .count();

        Map<String, Object> response = new HashMap<>();

        response.put("message", "Welcome to Admin Dashboard");
        response.put("totalUsers", totalUsers);
        response.put("totalAdmins", totalAdmins);
        response.put("totalNormalUsers", totalNormalUsers);

        return ResponseEntity.ok(response);
    }

    // =========================
    // GET ALL USERS
    // =========================

    @GetMapping("/users")
    public ResponseEntity<List<Map<String, Object>>> getAllUsers() {

        List<Map<String, Object>> users = userRepository.findAll()
                .stream()
                .map(this::userResponse)
                .toList();

        return ResponseEntity.ok(users);
    }

    // =========================
    // GET USER BY ID
    // =========================

    @GetMapping("/users/{id}")
    public ResponseEntity<Map<String, Object>> getUserById(
            @PathVariable Long id
    ) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with id: " + id
                        )
                );

        return ResponseEntity.ok(userResponse(user));
    }

    // =========================
    // CHANGE USER ROLE
    // USER <-> ADMIN
    // =========================

    @PutMapping("/users/{id}/role")
    public ResponseEntity<Map<String, Object>> updateUserRole(

            @PathVariable Long id,

            @Valid @RequestBody RoleUpdateRequest request,

            Authentication authentication
    ) {

        // Find user
        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with id: " + id
                        )
                );

        // =========================
        // PREVENT SELF DEMOTION
        // =========================

        if (user.getEmail().equalsIgnoreCase(authentication.getName())
                && request.getRole() != Role.ADMIN) {

            throw new RuntimeException(
                    "You cannot remove your own ADMIN role"
            );
        }

        // =========================
        // UPDATE ROLE
        // =========================

        user.setRole(request.getRole());

        User updatedUser = userRepository.save(user);

        // =========================
        // RESPONSE
        // =========================

        return ResponseEntity.ok(
                userResponse(updatedUser)
        );
    }

    // =========================
    // USER RESPONSE
    // PASSWORD NOT INCLUDED
    // =========================

    private Map<String, Object> userResponse(User user) {

        Map<String, Object> response = new HashMap<>();

        response.put("id", user.getId());
        response.put("username", user.getUsername());
        response.put("email", user.getEmail());
        response.put("role", user.getRole());

        return response;
    }
}