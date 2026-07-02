package com.rasoisutra.ecom.controllers;

import com.rasoisutra.ecom.dto.ApiResponse;
import com.rasoisutra.ecom.dto.OrderRequest;
import com.rasoisutra.ecom.models.Order;
import com.rasoisutra.ecom.services.OrderService;
import com.rasoisutra.ecom.services.PaymentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private PaymentService paymentService;

    // Public API: Place order (Guest Checkout)
    @PostMapping("/orders/checkout")
    public ResponseEntity<?> checkout(@Valid @RequestBody OrderRequest orderRequest) {
        Order order = orderService.createOrder(orderRequest);

        // If payment method is Razorpay, initiate Razorpay payment order
        if ("RAZORPAY".equalsIgnoreCase(order.getPaymentMethod())) {
            String razorpayOrderId = paymentService.createRazorpayOrder(order);
            order.setRazorpayOrderId(razorpayOrderId);
            orderService.saveOrderDirect(order); // Save update
        }

        return ResponseEntity.ok(ApiResponse.success("Order initiated successfully", order));
    }

    // Admin API: Stream new live orders using Server-Sent Events (SSE)
    @GetMapping(value = "/orders/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamOrders() {
        return orderService.registerEmitter();
    }

    // Admin API: Get all orders
    @GetMapping("/admin/orders")
    public ResponseEntity<?> getOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(ApiResponse.success("Orders fetched successfully", orders));
    }

    // Admin API: Get order by ID
    @GetMapping("/admin/orders/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable String id) {
        Order order = orderService.getOrderById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        return ResponseEntity.ok(ApiResponse.success("Order fetched successfully", order));
    }

    // Admin API: Update order status
    @PutMapping("/admin/orders/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable String id, @RequestParam String status) {
        Order order = orderService.updateOrderStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("Order status updated to " + status, order));
    }
}
