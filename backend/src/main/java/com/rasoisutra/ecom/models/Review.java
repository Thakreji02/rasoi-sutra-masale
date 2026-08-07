package com.rasoisutra.ecom.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String customerName;
    private Integer rating;
    
    @Column(columnDefinition = "TEXT")
    private String review;
    
    private Long productId;
    
    private LocalDateTime createdAt = LocalDateTime.now();
}
