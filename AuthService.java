package com.officemanagement.officemanagement.service;

import com.officemanagement.officemanagement.dto.AuthResponse;
import com.officemanagement.officemanagement.dto.LoginRequest;
import com.officemanagement.officemanagement.dto.RegisterRequest;
import com.officemanagement.officemanagement.entity.Role;
import com.officemanagement.officemanagement.entity.User;
import com.officemanagement.officemanagement.repository.UserRepository;
import com.officemanagement.officemanagement.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // =========================
    // REGISTER
    // =========================
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already registered");
        }

        User user = new User();

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());

        // Password encryption
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        // Public registration = USER only
        user.setRole(Role.USER);

        User savedUser = userRepository.save(user);

        String token = jwtService.generateToken(
                savedUser.getEmail(),
                savedUser.getRole().name()
        );

        return new AuthResponse(
                "Registration successful",
                token,
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getEmail(),
                savedUser.getRole().name()
        );
    }

    // =========================
    // LOGIN
    // =========================
    public AuthResponse login(LoginRequest request) {

        System.out.println("========== LOGIN DEBUG START ==========");

        System.out.println(
                "1. Login request received for: "
                        + request.getEmail()
        );

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password")
                );

        System.out.println(
                "2. User found: "
                        + user.getEmail()
        );

        // Check password
        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {
            System.out.println("3. Password NOT matched");

            throw new RuntimeException(
                    "Invalid email or password"
            );
        }

        System.out.println("3. Password matched");

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole().name()
        );

        System.out.println("4. JWT token generated");

        AuthResponse response = new AuthResponse(
                "Login successful",
                token,
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().name()
        );

        System.out.println(
                "5. Login response created for: "
                        + user.getUsername()
        );

        System.out.println("========== LOGIN DEBUG END ==========");

        return response;
    }
}