package com.rasoisutra.ecom.security;

import com.rasoisutra.ecom.models.Admin;
import com.rasoisutra.ecom.repositories.AdminRepository;
import com.rasoisutra.ecom.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 1. Try to authenticate as Admin (using alphanumeric username)
        var adminOpt = adminRepository.findByUsername(username);
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            return new User(
                    admin.getUsername(),
                    admin.getEncryptedPassword(),
                    Collections.singletonList(new SimpleGrantedAuthority(admin.getRole()))
            );
        }

        // 2. Try to authenticate as Customer User (using mobile number)
        com.rasoisutra.ecom.models.User customer = userRepository.findByMobileNumber(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with mobile number: " + username));

        return new User(
                customer.getMobileNumber(),
                customer.getPasswordHash(),
                Collections.singletonList(new SimpleGrantedAuthority(customer.getRole()))
        );
    }
}
