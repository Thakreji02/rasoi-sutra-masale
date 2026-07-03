package com.rasoisutra.ecom.controllers;

import com.rasoisutra.ecom.dto.ApiResponse;
import com.rasoisutra.ecom.dto.PaymentVerificationRequest;
import com.rasoisutra.ecom.models.Order;
import com.rasoisutra.ecom.models.Payment;
import com.rasoisutra.ecom.repositories.OrderRepository;
import com.rasoisutra.ecom.repositories.PaymentRepository;
import com.rasoisutra.ecom.services.OrderService;
import com.rasoisutra.ecom.services.PaymentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderService orderService;

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@Valid @RequestBody PaymentVerificationRequest request) {
        boolean isValid = paymentService.verifySignature(
                request.getRazorpayOrderId(),
                request.getRazorpayPaymentId(),
                request.getRazorpaySignature()
        );

        if (!isValid) {
            return ResponseEntity.status(400).body(ApiResponse.error("Payment signature verification failed"));
        }

        // Update the order in DB
        Order order = orderRepository.findByRazorpayOrderId(request.getRazorpayOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found for Razorpay order ID: " + request.getRazorpayOrderId()));

        order.setRazorpayPaymentId(request.getRazorpayPaymentId());
        order.setRazorpaySignature(request.getRazorpaySignature());
        order.setTransactionId(request.getRazorpayPaymentId());
        order.setPaymentStatus("PAID");
        order.setOrderStatus("PROCESSING"); // Mark order as processing for shipping

        orderService.saveOrderDirect(order); // Save and stream notify update

        // Create and save the Payment audit record
        Payment payment = new Payment();
        payment.setRazorpayOrderId(request.getRazorpayOrderId());
        payment.setRazorpayPaymentId(request.getRazorpayPaymentId());
        payment.setRazorpaySignature(request.getRazorpaySignature());
        payment.setAmount(order.getTotalAmount());
        payment.setCurrency("INR");
        payment.setPaymentStatus("SUCCESS");
        payment.setPaymentMethod("RAZORPAY");
        payment.setOrderId(order.getId());
        payment.setUserId(null); // Guest user
        payment.setCreatedAt(LocalDateTime.now());
        
        paymentRepository.save(payment);

        return ResponseEntity.ok(ApiResponse.success("Payment verified successfully", order));
    }
}
