package com.rasoisutra.ecom.repositories;

import com.rasoisutra.ecom.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findBySlug(String slug);
    List<Product> findByCategory(String category);
    List<Product> findByIsFeaturedTrue();
    
    @Query("SELECT p FROM Product p WHERE " +
           "LOWER(p.productName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.shortDescription) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.fullDescription) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Product> searchProducts(@Param("keyword") String keyword, Pageable pageable);
    
    Page<Product> findByCategory(String category, Pageable pageable);

    @Query("SELECT DISTINCT p FROM Product p LEFT JOIN p.variants v WHERE " +
           "(:category = 'all' OR p.category = :category) AND " +
           "(:keyword IS NULL OR :keyword = '' OR " +
           "LOWER(p.productName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.shortDescription) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.fullDescription) LIKE LOWER(CONCAT('%', :keyword, '%'))) AND " +
           "(:minPrice IS NULL OR v.sellingPrice >= :minPrice) AND " +
           "(:maxPrice IS NULL OR v.sellingPrice <= :maxPrice) AND " +
           "p.available = true")
    Page<Product> filterProducts(@Param("keyword") String keyword, 
                                 @Param("category") String category, 
                                 @Param("minPrice") Double minPrice, 
                                 @Param("maxPrice") Double maxPrice, 
                                 Pageable pageable);
}
