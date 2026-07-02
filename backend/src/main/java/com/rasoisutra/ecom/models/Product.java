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
    private String name;
    
    @Indexed(unique = true)
    private String slug;
    
    private String description;
    private String categoryId;
    private String brand = "Rasoi Sutra";
    private List<String> images = new ArrayList<>();
    private Double price;
    private Double discount = 0.0;
    private Integer stock = 0;
    private List<String> weight = new ArrayList<>();
    private List<String> ingredients = new ArrayList<>();
    private Boolean isAvailable = true;
    private Boolean featured = false;
    
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
}
