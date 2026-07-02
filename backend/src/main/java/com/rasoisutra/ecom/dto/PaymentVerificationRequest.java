package com.rasoisutra.ecom.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentVerificationRequest {
    @NotBlank(message = "Razorpay Order ID is required")
    private String razorpayOrderId;
    
    @NotBlank(message = "Razorpay Payment ID is required")
    private String razorpayPaymentId;
    
    @NotBlank(message = "Razorpay Signature is required")
    private String razorpaySignature;
}
