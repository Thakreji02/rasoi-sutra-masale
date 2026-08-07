package com.rasoisutra.ecom.controllers;

import com.rasoisutra.ecom.dto.ApiResponse;
import com.rasoisutra.ecom.dto.JwtResponse;
import com.rasoisutra.ecom.dto.LoginRequest;
import com.rasoisutra.ecom.models.User;
import com.rasoisutra.ecom.repositories.UserRepository;
import com.rasoisutra.ecom.security.JwtUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken((UserDetails) authentication.getPrincipal());
            
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String role = userDetails.getAuthorities().stream()
                    .map(item -> item.getAuthority())
                    .findFirst()
                    .orElse("ROLE_USER");

            JwtResponse jwtResponse = new JwtResponse(jwt, userDetails.getUsername(), role);
            return ResponseEntity.ok(ApiResponse.success("Login successful", jwtResponse));
        } catch (org.springframework.security.core.AuthenticationException e) {
            return ResponseEntity.status(401).body(ApiResponse.error("Invalid credentials"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Server authentication error: " + e.getMessage()));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserSignupDto registerRequest) {
        if (userRepository.existsByMobileNumber(registerRequest.getMobileNumber())) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Mobile number is already registered!"));
        }

        // Create new user account
        User user = new User();
        user.setFullName(registerRequest.getFullName());
        user.setMobileNumber(registerRequest.getMobileNumber());
        user.setEmail(registerRequest.getEmail());
        user.setPasswordHash(encoder.encode(registerRequest.getPassword()));
        user.setRole("ROLE_USER");

        userRepository.save(user);

        return ResponseEntity.ok(ApiResponse.success("User registered successfully!", null));
    }

    public static class UserSignupDto {
        private String fullName;
        private String mobileNumber;
        private String email;
        private String password;

        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }

        public String getMobileNumber() { return mobileNumber; }
        public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}
