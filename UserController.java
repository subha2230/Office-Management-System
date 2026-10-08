package com.officemanagement.officemanagement.controller;

import com.officemanagement.officemanagement.entity.User;
import com.officemanagement.officemanagement.repository.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(
        origins = "http://localhost:5173",
        methods = {
                RequestMethod.GET,
                RequestMethod.OPTIONS
        }
)
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // =========================
    // GET LOGGED-IN USER PROFILEyes
    // ADMIN + USER
    // =========================

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getMyProfile(
            Authentication authentication
    ) {

        User user = userRepository.findByEmail(
                authentication.getName()
        ).orElseThrow(() ->
                new RuntimeException("User not found")
        );

        Map<String, Object> response = new HashMap<>();

        response.put("id", user.getId());
        response.put("username", user.getUsername());
        response.put("email", user.getEmail());
        response.put("role", user.getRole());

        return ResponseEntity.ok(response);
    }
}