package com.rasoisutra.ecom.services;

import com.rasoisutra.ecom.models.Product;
import com.rasoisutra.ecom.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Page<Product> getFilteredProducts(String keyword, String category, Double minPrice, Double maxPrice,
                                            String sortBy, String direction, int page, int size) {
        Query query = new Query();

        // 1. Search Keyword Filter (searches in productName, shortDescription, and fullDescription)
        if (keyword != null && !keyword.trim().isEmpty()) {
            Criteria nameCriteria = Criteria.where("productName").regex(keyword, "i");
            Criteria shortDescCriteria = Criteria.where("shortDescription").regex(keyword, "i");
            Criteria fullDescCriteria = Criteria.where("fullDescription").regex(keyword, "i");
            query.addCriteria(new Criteria().orOperator(nameCriteria, shortDescCriteria, fullDescCriteria));
        }

        // 2. Category Filter
        if (category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("all")) {
            query.addCriteria(Criteria.where("category").is(category));
        }

        // 3. Price Filter Range (applies to sellingPrice)
        if (minPrice != null || maxPrice != null) {
            Criteria priceCriteria = Criteria.where("sellingPrice");
            if (minPrice != null) {
                priceCriteria.gte(minPrice);
            }
            if (maxPrice != null) {
                priceCriteria.lte(maxPrice);
            }
            query.addCriteria(priceCriteria);
        }

        // 4. Availability check
        query.addCriteria(Criteria.where("available").is(true));

        // 5. Total counts before pagination
        long total = mongoTemplate.count(query, Product.class);

        // 6. Pagination & Sorting
        Sort.Direction dir = "desc".equalsIgnoreCase(direction) ? Sort.Direction.DESC : Sort.Direction.ASC;
        String sortProperty = (sortBy != null && !sortBy.trim().isEmpty()) ? sortBy : "createdAt";
        
        // Map old sorting fields to new ones if requested
        if ("price".equals(sortProperty)) {
            sortProperty = "sellingPrice";
        } else if ("name".equals(sortProperty)) {
            sortProperty = "productName";
        }
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(dir, sortProperty));
        query.with(pageable);

        List<Product> products = mongoTemplate.find(query, Product.class);
        return new PageImpl<>(products, pageable, total);
    }

    public List<Product> getFeaturedProducts() {
        return productRepository.findByIsFeaturedTrue();
    }

    public Optional<Product> getProductById(String id) {
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

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }

    public List<Product> getAllProductsRaw() {
        return productRepository.findAll();
    }
}
