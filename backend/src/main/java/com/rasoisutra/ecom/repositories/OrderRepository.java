package com.rasoisutra.ecom.repositories;

import com.rasoisutra.ecom.models.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findAllByOrderByOrderDateDesc();
    Optional<Order> findByRazorpayOrderId(String razorpayOrderId);
}
