package com.rasoisutra.ecom.repositories;

import com.rasoisutra.ecom.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByOrderByOrderDateDesc();
    Optional<Order> findByRazorpayOrderId(String razorpayOrderId);
    List<Order> findAllByUserIdOrderByOrderDateDesc(Long userId);
}
