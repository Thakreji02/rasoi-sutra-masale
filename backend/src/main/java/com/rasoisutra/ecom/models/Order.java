package com.rasoisutra.ecom.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Document(collection = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    private String id;
    
    private String customerName;
    private String email;
    private String mobile;
    private String address;
    private String city;
    private String state;
    private String pincode;
    
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
