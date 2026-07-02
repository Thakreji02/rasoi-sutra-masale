package com.rasoisutra.ecom.models;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {
    private String productId;
    private String name;
    private Double price;
    private String weightSelected;
    private Integer quantity;
}
