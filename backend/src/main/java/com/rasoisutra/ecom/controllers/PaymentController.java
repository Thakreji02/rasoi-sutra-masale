package com.rasoisutra.ecom.controllers;

import com.rasoisutra.ecom.dto.ApiResponse;
import com.rasoisutra.ecom.dto.PaymentVerificationRequest;
import com.rasoisutra.ecom.models.Order;
import com.rasoisutra.ecom.repositories.OrderRepository;
import com.rasoisutra.ecom.services.OrderService;
import com.rasoisutra.ecom.services.PaymentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private OrderRepository orderRepository;

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

        return ResponseEntity.ok(ApiResponse.success("Payment verified successfully", order));
    }
}
