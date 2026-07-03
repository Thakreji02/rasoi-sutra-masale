package com.rasoisutra.ecom.models;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductVariant {
    private String unit; // e.g., "50g", "100g", "200g", "500g", "1kg"
    private Double mrp;
    private Double sellingPrice;
    private Double discountPercentage = 0.0;
    private Integer stock = 0;
    private String sku;
}
