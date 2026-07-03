package com.rasoisutra.ecom.controllers;

import com.rasoisutra.ecom.dto.ApiResponse;
import com.rasoisutra.ecom.models.Product;
import com.rasoisutra.ecom.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Public API: Get filtered, sorted, paginated products
    @GetMapping("/products")
    public ResponseEntity<?> getProducts(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size) {
        
        Page<Product> productPage = productService.getFilteredProducts(keyword, category, minPrice, maxPrice, sortBy, direction, page, size);
        
        Map<String, Object> response = new HashMap<>();
        response.put("products", productPage.getContent());
        response.put("currentPage", productPage.getNumber());
        response.put("totalItems", productPage.getTotalElements());
        response.put("totalPages", productPage.getTotalPages());
        
        return ResponseEntity.ok(ApiResponse.success("Products fetched successfully", response));
    }

    // Public API: Get featured products
    @GetMapping("/products/featured")
    public ResponseEntity<?> getFeaturedProducts() {
        List<Product> products = productService.getFeaturedProducts();
        return ResponseEntity.ok(ApiResponse.success("Featured products fetched successfully", products));
    }

    // Public API: Get by ID
    @GetMapping("/products/{id}")
    public ResponseEntity<?> getProductById(@PathVariable String id) {
        Product product = productService.getProductById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        return ResponseEntity.ok(ApiResponse.success("Product fetched successfully", product));
    }

    // Public API: Get by Slug
    @GetMapping("/products/slug/{slug}")
    public ResponseEntity<?> getProductBySlug(@PathVariable String slug) {
        Product product = productService.getProductBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Product not found with slug: " + slug));
        return ResponseEntity.ok(ApiResponse.success("Product fetched successfully", product));
    }

    // Admin API: Create product
    @PostMapping("/admin/products")
    public ResponseEntity<?> createProduct(@RequestBody Product product) {
        Product savedProduct = productService.saveProduct(product);
        return ResponseEntity.ok(ApiResponse.success("Product created successfully", savedProduct));
    }

    // Admin API: Update product
    @PutMapping("/admin/products/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable String id, @RequestBody Product product) {
        Product existingProduct = productService.getProductById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        
        existingProduct.setProductName(product.getProductName());
        existingProduct.setCategory(product.getCategory());
        existingProduct.setBrandName(product.getBrandName());
        existingProduct.setShortDescription(product.getShortDescription());
        existingProduct.setFullDescription(product.getFullDescription());
        existingProduct.setImage(product.getImage());
        existingProduct.setGalleryImages(product.getGalleryImages());
        existingProduct.setMrp(product.getMrp());
        existingProduct.setSellingPrice(product.getSellingPrice());
        existingProduct.setDiscountPercentage(product.getDiscountPercentage());
        existingProduct.setStock(product.getStock());
        existingProduct.setUnit(product.getUnit());
        existingProduct.setWeight(product.getWeight());
        existingProduct.setIngredients(product.getIngredients());
        existingProduct.setShelfLife(product.getShelfLife());
        existingProduct.setStorageInstructions(product.getStorageInstructions());
        existingProduct.setCountryOfOrigin(product.getCountryOfOrigin());
        existingProduct.setIsBestSeller(product.getIsBestSeller());
        existingProduct.setIsFeatured(product.getIsFeatured());
        existingProduct.setRating(product.getRating());
        existingProduct.setReviewsCount(product.getReviewsCount());
        existingProduct.setAvailable(product.getAvailable());
        existingProduct.setTags(product.getTags());

        Product updatedProduct = productService.saveProduct(existingProduct);
        return ResponseEntity.ok(ApiResponse.success("Product updated successfully", updatedProduct));
    }

    // Admin API: Delete product
    @DeleteMapping("/admin/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(ApiResponse.success("Product deleted successfully"));
    }
}
