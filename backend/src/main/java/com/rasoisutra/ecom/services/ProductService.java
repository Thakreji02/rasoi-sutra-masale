package com.rasoisutra.ecom.services;

import com.rasoisutra.ecom.models.Product;
import com.rasoisutra.ecom.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Page<Product> getFilteredProducts(String keyword, String category, Double minPrice, Double maxPrice,
                                             String sortBy, String direction, int page, int size) {
        
        Sort.Direction dir = "desc".equalsIgnoreCase(direction) ? Sort.Direction.DESC : Sort.Direction.ASC;
        String sortProperty = (sortBy != null && !sortBy.trim().isEmpty()) ? sortBy : "createdAt";
        
        // Map old sorting fields to new ones if requested
        if ("price".equals(sortProperty)) {
            sortProperty = "createdAt"; // Fallback as price is now in variants child list
        } else if ("name".equals(sortProperty)) {
            sortProperty = "productName";
        }
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(dir, sortProperty));
        
        String cleanKeyword = (keyword != null && !keyword.trim().isEmpty()) ? keyword.trim() : null;
        String cleanCategory = (category != null && !category.trim().isEmpty()) ? category.trim() : "all";

        return productRepository.filterProducts(cleanKeyword, cleanCategory, minPrice, maxPrice, pageable);
    }

    public List<Product> getFeaturedProducts() {
        return productRepository.findByIsFeaturedTrue();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Optional<Product> getProductBySlug(String slug) {
        return productRepository.findBySlug(slug);
    }

    public Product saveProduct(Product product) {
        product.setUpdatedAt(LocalDateTime.now());
        if (product.getId() == null) {
            product.setCreatedAt(LocalDateTime.now());
            // Create slug from productName
            product.setSlug(product.getProductName().toLowerCase().replaceAll("[^a-z0-9]+", "-"));
        }
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public List<Product> getAllProductsRaw() {
        return productRepository.findAll();
    }
}
