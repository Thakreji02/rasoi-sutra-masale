package com.rasoisutra.ecom.controllers;

import com.rasoisutra.ecom.dto.ApiResponse;
import com.rasoisutra.ecom.models.User;
import com.rasoisutra.ecom.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<?> getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.error("Unauthorized access"));
        }

        String mobileNumber = authentication.getName();
        Optional<User> userOpt = userRepository.findByMobileNumber(mobileNumber);
        
        if (userOpt.isPresent()) {
            return ResponseEntity.ok(ApiResponse.success("User profile retrieved", userOpt.get()));
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.error("User not found"));
    }
}
