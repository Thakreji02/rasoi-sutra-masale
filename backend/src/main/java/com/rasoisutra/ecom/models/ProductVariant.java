package com.rasoisutra.ecom.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "product_variants")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductVariant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String unit; // e.g., "50g", "100g", "200g", "500g", "1kg"
    private Double mrp;
    private Double sellingPrice;
    private Double discountPercentage = 0.0;
    private Integer stock = 0;
    private String sku;

    public ProductVariant(String unit, Double mrp, Double sellingPrice, Double discountPercentage, Integer stock, String sku) {
        this.unit = unit;
        this.mrp = mrp;
        this.sellingPrice = sellingPrice;
        this.discountPercentage = discountPercentage;
        this.stock = stock;
        this.sku = sku;
    }
}
