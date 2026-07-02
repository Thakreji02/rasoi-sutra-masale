package com.rasoisutra.ecom.services;

import com.rasoisutra.ecom.dto.OrderRequest;
import com.rasoisutra.ecom.models.Order;
import com.rasoisutra.ecom.models.OrderItem;
import com.rasoisutra.ecom.repositories.OrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class OrderService {
    private static final Logger logger = LoggerFactory.getLogger(OrderService.class);

    @Autowired
    private OrderRepository orderRepository;

    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByOrderDateDesc();
    }

    public Optional<Order> getOrderById(String id) {
        return orderRepository.findById(id);
    }

    public Order createOrder(OrderRequest request) {
        Order order = new Order();
        order.setCustomerName(request.getCustomerName());
        order.setEmail(request.getEmail());
        order.setMobile(request.getMobile());
        order.setAddress(request.getAddress());
        order.setCity(request.getCity());
        order.setState(request.getState());
        order.setPincode(request.getPincode());
        order.setOrderedItems(request.getOrderedItems());
        order.setPaymentMethod(request.getPaymentMethod());

        // Calculations
        double subtotal = 0.0;
        for (OrderItem item : request.getOrderedItems()) {
            subtotal += item.getPrice() * item.getQuantity();
        }
        order.setSubtotal(subtotal);
        
        // Let's make shipping charge free above 500, otherwise 50 INR
        double shipping = subtotal >= 500.0 ? 0.0 : 50.0;
        order.setShippingCharge(shipping);
        order.setTotalAmount(subtotal + shipping);
        
        order.setOrderStatus("PLACED");
        order.setOrderDate(LocalDateTime.now());

        if ("COD".equalsIgnoreCase(request.getPaymentMethod())) {
            order.setPaymentStatus("PENDING");
            order.setTransactionId("COD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        } else {
            order.setPaymentStatus("PENDING");
        }

        Order savedOrder = orderRepository.save(order);
        
        // Notify admin in real-time
        broadcastNewOrder(savedOrder);
        
        return savedOrder;
    }

    public Order updateOrderStatus(String id, String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        order.setOrderStatus(status);
        return orderRepository.save(order);
    }

    public Order updatePaymentStatus(String id, String status, String transactionId) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        order.setPaymentStatus(status);
        if (transactionId != null) {
            order.setTransactionId(transactionId);
        }
        return orderRepository.save(order);
    }

    public void saveOrderDirect(Order order) {
        orderRepository.save(order);
        broadcastNewOrder(order);
    }

    public SseEmitter registerEmitter() {
        SseEmitter emitter = new SseEmitter(24 * 60 * 60 * 1000L); // 24 hours timeout
        emitters.add(emitter);

        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        emitter.onError((e) -> emitters.remove(emitter));

        // Send a test connection message
        try {
            emitter.send(SseEmitter.event().name("connection").data("connected"));
        } catch (IOException e) {
            logger.error("Failed to send SSE connection test", e);
        }

        return emitter;
    }

    private void broadcastNewOrder(Order order) {
        List<SseEmitter> deadEmitters = new ArrayList<>();
        
        // Flatten structure for SSE notifications to match Dashboard structure
        var notifyPayload = new Object() {
            public final String id = order.getId();
            public final String orderNumber = order.getId() != null ? order.getId().substring(order.getId().length() - 6).toUpperCase() : "NEW";
            public final String customerName = order.getCustomerName();
            public final Double totalAmount = order.getTotalAmount();
        };

        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(SseEmitter.event().data(notifyPayload));
            } catch (Exception e) {
                deadEmitters.add(emitter);
            }
        }
        emitters.removeAll(deadEmitters);
    }
}
