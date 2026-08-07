package com.rasoisutra.ecom.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
    private Double amount;
    private String currency;
    private String paymentStatus; // e.g. "SUCCESS", "FAILED"
    private String paymentMethod; // e.g. "UPI", "CARD"
    private Long orderId;
    private Long userId; // optional for guest users
    
    private LocalDateTime createdAt = LocalDateTime.now();
}
