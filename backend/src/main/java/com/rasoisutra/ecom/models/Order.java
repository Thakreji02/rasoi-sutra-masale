package com.rasoisutra.ecom.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long userId; // Nullable to support guest checkout if required, or linked to logged-in user
    private Long addressId; // Foreign key referencing saved address (optional)
    
    private String customerName;
    private String email;
    private String mobile;
    
    @Column(columnDefinition = "TEXT")
    private String address;
    
    private String city;
    private String state;
    private String pincode;
    
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id")
    private List<OrderItem> orderedItems = new ArrayList<>();
    
    private String paymentMethod;
    private String paymentStatus = "PENDING";
    private String orderStatus = "PLACED";
    
    private Double subtotal = 0.0;
    private Double shippingCharge = 0.0;
    private Double totalAmount = 0.0;
    
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
    private String transactionId;
    
    private LocalDateTime orderDate = LocalDateTime.now();
}
