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

    public Page<Product> getFilteredProducts(String keyword, String categoryId, Double minPrice, Double maxPrice,
                                            String sortBy, String direction, int page, int size) {
        Query query = new Query();

        // 1. Search Keyword Filter
        if (keyword != null && !keyword.trim().isEmpty()) {
            Criteria nameCriteria = Criteria.where("name").regex(keyword, "i");
            Criteria descCriteria = Criteria.where("description").regex(keyword, "i");
            query.addCriteria(new Criteria().orOperator(nameCriteria, descCriteria));
        }

        // 2. Category ID Filter
        if (categoryId != null && !categoryId.trim().isEmpty() && !categoryId.equalsIgnoreCase("all")) {
            query.addCriteria(Criteria.where("categoryId").is(categoryId));
        }

        // 3. Price Filter Range
        if (minPrice != null || maxPrice != null) {
            Criteria priceCriteria = Criteria.where("price");
            if (minPrice != null) {
                priceCriteria.gte(minPrice);
            }
            if (maxPrice != null) {
                priceCriteria.lte(maxPrice);
            }
            query.addCriteria(priceCriteria);
        }

        // 4. Availability check
        query.addCriteria(Criteria.where("isAvailable").is(true));

        // 5. Total counts before pagination
        long total = mongoTemplate.count(query, Product.class);

        // 6. Pagination & Sorting
        Sort.Direction dir = "desc".equalsIgnoreCase(direction) ? Sort.Direction.DESC : Sort.Direction.ASC;
        String sortProperty = (sortBy != null && !sortBy.trim().isEmpty()) ? sortBy : "createdAt";
        Pageable pageable = PageRequest.of(page, size, Sort.by(dir, sortProperty));
        query.with(pageable);

        List<Product> products = mongoTemplate.find(query, Product.class);
        return new PageImpl<>(products, pageable, total);
    }

    public List<Product> getFeaturedProducts() {
        return productRepository.findByFeaturedTrue();
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
            // Create slug from name
            product.setSlug(product.getName().toLowerCase().replaceAll("[^a-z0-9]+", "-"));
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
