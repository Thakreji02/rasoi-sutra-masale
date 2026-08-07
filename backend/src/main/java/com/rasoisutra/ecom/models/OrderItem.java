package com.rasoisutra.ecom.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "order_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long productId;
    private String name;
    private Double price;
    private String weightSelected;
    private Integer quantity;

    public OrderItem(Long productId, String name, Double price, String weightSelected, Integer quantity) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.weightSelected = weightSelected;
        this.quantity = quantity;
    }
}
