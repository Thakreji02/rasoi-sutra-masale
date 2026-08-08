package com.rasoisutra.ecom.services;

import com.rasoisutra.ecom.dto.OrderRequest;
import com.rasoisutra.ecom.models.Order;
import com.rasoisutra.ecom.models.OrderItem;
import com.rasoisutra.ecom.models.Product;
import com.rasoisutra.ecom.models.ProductVariant;
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

    @Autowired
    private ProductService productService;

    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByOrderDateDesc();
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findAllByUserIdOrderByOrderDateDesc(userId);
    }

    public Order createOrder(OrderRequest request) {
        Order order = new Order();
        order.setUserId(request.getUserId());
        order.setAddressId(request.getAddressId());
        order.setCustomerName(request.getCustomerName());
        order.setEmail(request.getEmail());
        order.setMobile(request.getMobile());
        order.setAddress(request.getAddress());
        order.setCity(request.getCity());
        order.setState(request.getState());
        order.setPincode(request.getPincode());
        order.setOrderedItems(request.getOrderedItems());
        order.setPaymentMethod(request.getPaymentMethod());

        // Calculations with server-side validation
        double subtotal = 0.0;
        for (OrderItem item : request.getOrderedItems()) {
            double actualPrice = item.getPrice() != null ? item.getPrice() : 0.0;
            if (item.getProductId() != null) {
                Optional<Product> optProduct = productService.getProductById(item.getProductId());
                if (optProduct.isPresent()) {
                    Product product = optProduct.get();
                    boolean found = false;
                    if (product.getVariants() != null) {
                        for (ProductVariant v : product.getVariants()) {
                            if (v.getUnit() != null && v.getUnit().equalsIgnoreCase(item.getWeightSelected())) {
                                actualPrice = v.getSellingPrice();
                                found = true;
                                break;
                            }
                        }
                    }
                    if (!found && product.getVariants() != null && !product.getVariants().isEmpty()) {
                        actualPrice = product.getVariants().get(0).getSellingPrice();
                    }
                }
            }
            
            item.setPrice(actualPrice);
            int qty = item.getQuantity() != null && item.getQuantity() > 0 ? item.getQuantity() : 1;
            subtotal += actualPrice * qty;
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

    public Order updateOrderStatus(Long id, String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        order.setOrderStatus(status);
        if ("DELIVERED".equalsIgnoreCase(status)) {
            order.setPaymentStatus("PAID");
        }
        return orderRepository.save(order);
    }

    public Order updatePaymentStatus(Long id, String status, String transactionId) {
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
            public final String id = order.getId() != null ? String.valueOf(order.getId()) : null;
            public final String orderNumber = order.getId() != null ? String.valueOf(order.getId()) : "NEW";
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
