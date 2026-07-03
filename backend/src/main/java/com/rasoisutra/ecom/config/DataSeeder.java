package com.rasoisutra.ecom.config;

import com.rasoisutra.ecom.models.Admin;
import com.rasoisutra.ecom.models.Category;
import com.rasoisutra.ecom.models.Product;
import com.rasoisutra.ecom.repositories.AdminRepository;
import com.rasoisutra.ecom.repositories.CategoryRepository;
import com.rasoisutra.ecom.repositories.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(DataSeeder.class);

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        seedAdmin();
        seedCategoriesAndProducts();
    }

    private void seedAdmin() {
        // Delete all old admin entries to prevent duplication or corrupt credential clashes
        adminRepository.deleteAll();
        logger.info("Old admin entries deleted.");

        // Create a single fresh admin account with the requested password
        Admin admin = new Admin();
        admin.setUsername("admin");
        admin.setRole("ROLE_ADMIN");
        admin.setEncryptedPassword(passwordEncoder.encode("RasoiSutra2026"));
        adminRepository.save(admin);
        logger.info("New admin account seeded successfully with password: RasoiSutra2026");
    }

    private void seedCategoriesAndProducts() {
        // Clear all old database items to prevent schema clash
        productRepository.deleteAll();
        categoryRepository.deleteAll();
        logger.info("Cleared old database categories and products.");

        // Create Categories
        Category groundSpices = new Category(null, "Ground Spices", "/haldi.jpg");
        Category wholeSpices = new Category(null, "Whole Spices", "/jeera.jpg");
        Category spiceBlends = new Category(null, "Spice Blends", "/garam_masala.jpg");

        groundSpices = categoryRepository.save(groundSpices);
        wholeSpices = categoryRepository.save(wholeSpices);
        spiceBlends = categoryRepository.save(spiceBlends);
        logger.info("Seeded categories Ground Spices, Whole Spices, Spice Blends.");

        // Create 4 core products using the new schema
        Product haldi = new Product();
        haldi.setProductName("Premium Haldi Powder");
        haldi.setSlug("premium-haldi-powder");
        haldi.setCategory("Ground Spices");
        haldi.setBrandName("Rasoi Sutra");
        haldi.setShortDescription("100% Pure & Natural premium turmeric powder with high curcumin content.");
        haldi.setFullDescription("Sourced from the finest farms, Rasoi Sutra Haldi Powder is ground using low-temperature grinding technology to retain its natural oils, rich golden color, and strong therapeutic value. Curcumin content is tested to ensure maximum health benefits.");
        haldi.setImage("/haldi.jpg");
        haldi.setGalleryImages(Arrays.asList("/haldi.jpg"));
        haldi.setMrp(120.0);
        haldi.setSellingPrice(99.0);
        haldi.setDiscountPercentage(17.5);
        haldi.setStock(150);
        haldi.setUnit("200g");
        haldi.setWeight(200.0);
        haldi.setIngredients(Arrays.asList("100% Natural Turmeric Rhizomes"));
        haldi.setShelfLife("12 Months");
        haldi.setStorageInstructions("Store in a cool, dry place in an airtight container.");
        haldi.setCountryOfOrigin("India");
        haldi.setIsBestSeller(true);
        haldi.setIsFeatured(true);
        haldi.setRating(4.8);
        haldi.setReviewsCount(18);
        haldi.setAvailable(true);
        haldi.setTags(Arrays.asList("haldi", "turmeric", "ground spice", "pure"));

        Product chilli = new Product();
        chilli.setProductName("Premium Lal Mirch Powder");
        chilli.setSlug("premium-lal-mirch-powder");
        chilli.setCategory("Ground Spices");
        chilli.setBrandName("Rasoi Sutra");
        chilli.setShortDescription("100% Pure & Natural vibrant red chilli powder with mild pleasant heat.");
        chilli.setFullDescription("Expertly sourced, sun-dried Red Chillies ground into a fine powder. It gives your curries a rich, natural red color without any artificial coloring agents. Delivers a perfect balanced taste with mild pungency.");
        chilli.setImage("/chilli.jpg");
        chilli.setGalleryImages(Arrays.asList("/chilli.jpg"));
        chilli.setMrp(150.0);
        chilli.setSellingPrice(129.0);
        chilli.setDiscountPercentage(14.0);
        chilli.setStock(120);
        chilli.setUnit("200g");
        chilli.setWeight(200.0);
        chilli.setIngredients(Arrays.asList("100% Pure Red Chilli"));
        chilli.setShelfLife("12 Months");
        chilli.setStorageInstructions("Keep away from moisture and direct sunlight.");
        chilli.setCountryOfOrigin("India");
        chilli.setIsBestSeller(true);
        chilli.setIsFeatured(true);
        chilli.setRating(4.9);
        chilli.setReviewsCount(24);
        chilli.setAvailable(true);
        chilli.setTags(Arrays.asList("chilli", "mirch", "red chilli", "spicy"));

        Product garamMasala = new Product();
        garamMasala.setProductName("Premium Garam Masala");
        garamMasala.setSlug("premium-garam-masala");
        garamMasala.setCategory("Spice Blends");
        garamMasala.setBrandName("Rasoi Sutra");
        garamMasala.setShortDescription("Traditional blend of premium roasted whole spices for rich flavor and aroma.");
        garamMasala.setFullDescription("A hand-crafted blend of 15 premium Indian whole spices including green cardamom, cinnamon, cloves, nutmeg, and mace. Perfect for elevating your traditional curries, biryanis, and gravies. Sourced with care, blended to perfection.");
        garamMasala.setImage("/garam_masala.jpg");
        garamMasala.setGalleryImages(Arrays.asList("/garam_masala.jpg"));
        garamMasala.setMrp(180.0);
        garamMasala.setSellingPrice(149.0);
        garamMasala.setDiscountPercentage(17.2);
        garamMasala.setStock(100);
        garamMasala.setUnit("200g");
        garamMasala.setWeight(200.0);
        garamMasala.setIngredients(Arrays.asList("Cardamom", "Cinnamon", "Cloves", "Nutmeg", "Black Pepper", "Cumin", "Coriander", "Star Anise"));
        garamMasala.setShelfLife("12 Months");
        garamMasala.setStorageInstructions("Store in an airtight container immediately after opening.");
        garamMasala.setCountryOfOrigin("India");
        garamMasala.setIsBestSeller(true);
        garamMasala.setIsFeatured(true);
        garamMasala.setRating(4.7);
        garamMasala.setReviewsCount(15);
        garamMasala.setAvailable(true);
        garamMasala.setTags(Arrays.asList("garam masala", "blend", "masala", "aromatic"));

        Product jeera = new Product();
        jeera.setProductName("Premium Jeera Whole");
        jeera.setSlug("premium-jeera-whole");
        jeera.setCategory("Whole Spices");
        jeera.setBrandName("Rasoi Sutra");
        jeera.setShortDescription("100% Pure & Natural bold cumin seeds with intense earthy aroma.");
        jeera.setFullDescription("Carefully selected clean, bold cumin seeds (Jeera) from Gujarat's finest crops. It delivers a rich, warm, earthy flavor that is essential for dal tadka, jeera rice, and curries. Naturally sun-dried to keep the oils intact.");
        jeera.setImage("/jeera.jpg");
        jeera.setGalleryImages(Arrays.asList("/jeera.jpg", "/jeera_recipe.jpg"));
        jeera.setMrp(160.0);
        jeera.setSellingPrice(135.0);
        jeera.setDiscountPercentage(15.6);
        jeera.setStock(180);
        jeera.setUnit("200g");
        jeera.setWeight(200.0);
        jeera.setIngredients(Arrays.asList("100% Natural Whole Cumin Seeds"));
        jeera.setShelfLife("12 Months");
        jeera.setStorageInstructions("Keep in a dry place to prevent mold.");
        jeera.setCountryOfOrigin("India");
        jeera.setIsBestSeller(false);
        jeera.setIsFeatured(true);
        jeera.setRating(4.6);
        jeera.setReviewsCount(32);
        jeera.setAvailable(true);
        jeera.setTags(Arrays.asList("jeera", "cumin", "whole spice", "seeds"));

        productRepository.saveAll(Arrays.asList(haldi, chilli, garamMasala, jeera));
        logger.info("New Products seeded successfully.");
    }
}
