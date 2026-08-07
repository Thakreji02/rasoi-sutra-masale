package com.rasoisutra.ecom.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "addresses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private Long userId; // Foreign Key referencing User.id
    
    @Column(nullable = false)
    private String recipientName;
    
    private String buildingDetails;
    private String street;
    
    @Column(nullable = false)
    private String city;
    
    @Column(nullable = false)
    private String pincode;
    
    @Column(nullable = false)
    private String phoneNumber;
}
