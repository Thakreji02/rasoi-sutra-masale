package com.rasoisutra.ecom.controllers;

import com.rasoisutra.ecom.dto.ApiResponse;
import com.rasoisutra.ecom.models.Address;
import com.rasoisutra.ecom.models.User;
import com.rasoisutra.ecom.repositories.AddressRepository;
import com.rasoisutra.ecom.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/addresses")
public class AddressController {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || "anonymousUser".equals(authentication.getPrincipal())) {
            return null;
        }
        String mobileNumber = authentication.getName();
        return userRepository.findByMobileNumber(mobileNumber).orElse(null);
    }

    @PostMapping
    public ResponseEntity<?> saveAddress(@RequestBody Address address) {
        User user = getAuthenticatedUser();
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.error("Unauthorized"));
        }

        address.setUserId(user.getId());
        Address saved = addressRepository.save(address);
        return ResponseEntity.ok(ApiResponse.success("Address saved successfully", saved));
    }

    @GetMapping("/my-addresses")
    public ResponseEntity<?> getMyAddresses() {
        User user = getAuthenticatedUser();
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.error("Unauthorized"));
        }

        List<Address> addresses = addressRepository.findByUserId(user.getId());
        return ResponseEntity.ok(ApiResponse.success("Addresses retrieved successfully", addresses));
    }
}
