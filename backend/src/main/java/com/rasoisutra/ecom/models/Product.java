package com.rasoisutra.ecom.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Document(collection = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    private String id;
    
    @Indexed(unique = true)
    private String productName;
    
    @Indexed(unique = true)
    private String slug;
    
    private String category;
    
    private String brandName = "Rasoi Sutra";
    
    private String shortDescription;
    
    private String fullDescription;
    
    private String image;
    
    private List<String> galleryImages = new ArrayList<>();
    
    private List<ProductVariant> variants = new ArrayList<>();
    
    private List<String> ingredients = new ArrayList<>();
    
    private String shelfLife; // e.g., "12 Months"
    
    private String storageInstructions;
    
    private String countryOfOrigin = "India";
    
    private Boolean isBestSeller = false;
    
    private Boolean isFeatured = false;
    
    private Double rating = 4.5;
    
    private Integer reviewsCount = 0;
    
    private Boolean available = true;
    
    private List<String> tags = new ArrayList<>();
    
    private LocalDateTime createdAt = LocalDateTime.now();
    
    private LocalDateTime updatedAt = LocalDateTime.now();
}
