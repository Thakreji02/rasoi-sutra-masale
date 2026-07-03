package com.rasoisutra.ecom.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Document(collection = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    private String paymentId;
    
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
    private Double amount;
    private String currency;
    private String paymentStatus; // e.g. "SUCCESS", "FAILED"
    private String paymentMethod; // e.g. "UPI", "CARD"
    private String orderId;
    private String userId; // optional for guest users
    
    private LocalDateTime createdAt = LocalDateTime.now();
}
