package com.rasoisutra.ecom.controllers;

import com.rasoisutra.ecom.dto.ApiResponse;
import com.rasoisutra.ecom.dto.JwtResponse;
import com.rasoisutra.ecom.dto.LoginRequest;
import com.rasoisutra.ecom.security.JwtUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

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
                    .orElse("ROLE_ADMIN");

            JwtResponse jwtResponse = new JwtResponse(jwt, userDetails.getUsername(), role);
            return ResponseEntity.ok(ApiResponse.success("Login successful", jwtResponse));
        } catch (org.springframework.security.core.AuthenticationException e) {
            return ResponseEntity.status(401).body(ApiResponse.error("Invalid credentials"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(ApiResponse.error("Server authentication error: " + e.getMessage()));
        }
    }
}
