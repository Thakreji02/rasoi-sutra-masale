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
import java.util.List;

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
        Admin admin = adminRepository.findByUsername("admin").orElse(null);
        if (admin == null) {
            logger.info("Seeding default admin account...");
            admin = new Admin();
            admin.setUsername("admin");
            admin.setRole("ROLE_ADMIN");
        } else {
            logger.info("Updating existing admin account password to sync default values...");
        }
        // Encrypt the password RasoiSutraAdmin2026!
        admin.setEncryptedPassword(passwordEncoder.encode("RasoiSutraAdmin2026!"));
        adminRepository.save(admin);
        logger.info("Admin account seeded/updated successfully.");
    }

    private void seedCategoriesAndProducts() {
        if (categoryRepository.count() == 0) {
            logger.info("Seeding categories and products...");

            // Create Categories
            Category turmeric = new Category(null, "Turmeric", "/src/assets/products/turmeric.jpg");
            Category chilli = new Category(null, "Red Chilli", "/src/assets/products/chilli.jpg");
            Category coriander = new Category(null, "Coriander", "/src/assets/products/coriander.jpg");
            Category garamMasala = new Category(null, "Garam Masala", "/src/assets/products/garam_masala.jpg");
            Category comboPacks = new Category(null, "Combo Packs", "/src/assets/products/combo_packs.jpg");

            turmeric = categoryRepository.save(turmeric);
            chilli = categoryRepository.save(chilli);
            coriander = categoryRepository.save(coriander);
            garamMasala = categoryRepository.save(garamMasala);
            comboPacks = categoryRepository.save(comboPacks);

            logger.info("Categories seeded.");

            // Create Products
            Product p1 = new Product(null, "Organic Turmeric Powder", "organic-turmeric-powder",
                    "Directly sourced Salem turmeric powder with high curcumin content, providing natural aroma and rich color to every dish. Free from fillers and artificial colors.",
                    turmeric.getId(), "Rasoi Sutra",
                    Arrays.asList("/src/assets/products/turmeric.jpg"),
                    120.0, 10.0, 150,
                    Arrays.asList("100g", "250g", "500g"),
                    Arrays.asList("100% Organic Turmeric Root"),
                    true, true, LocalDateTime.now(), LocalDateTime.now());

            Product p2 = new Product(null, "Kashmiri Lal Mirch Powder", "kashmiri-lal-mirch-powder",
                    "Premium Kashmiri Red Chilli Powder known for its vibrant red color and mild, pleasant heat. Handpicked and ground to perfection.",
                    chilli.getId(), "Rasoi Sutra",
                    Arrays.asList("/src/assets/products/chilli.jpg"),
                    140.0, 5.0, 120,
                    Arrays.asList("100g", "250g", "500g"),
                    Arrays.asList("100% Sun-Dried Kashmiri Chillies"),
                    true, true, LocalDateTime.now(), LocalDateTime.now());

            Product p3 = new Product(null, "Premium Coriander Powder", "premium-coriander-powder",
                    "Aromatic Dhaniya (Coriander) powder sourced from the fertile plains of Rajasthan. Adds a sweet, citrusy flavor note to curries and stir-fries.",
                    coriander.getId(), "Rasoi Sutra",
                    Arrays.asList("/src/assets/products/coriander.jpg"),
                    95.0, 0.0, 200,
                    Arrays.asList("100g", "250g", "500g"),
                    Arrays.asList("100% Whole Coriander Seeds"),
                    true, false, LocalDateTime.now(), LocalDateTime.now());

            Product p4 = new Product(null, "Shahi Garam Masala", "shahi-garam-masala",
                    "A secret royal blend of 15 premium spices including green cardamom, cinnamon, cloves, and mace. Freshly ground in small batches to preserve volatile oils.",
                    garamMasala.getId(), "Rasoi Sutra",
                    Arrays.asList("/src/assets/products/garam_masala.jpg"),
                    180.0, 15.0, 100,
                    Arrays.asList("100g", "250g", "500g"),
                    Arrays.asList("Cardamom", "Cinnamon", "Cloves", "Mace", "Black Pepper", "Cumin", "Coriander"),
                    true, true, LocalDateTime.now(), LocalDateTime.now());

            Product p5 = new Product(null, "Panch Phoron (Five Spice Mix)", "panch-phoron-five-spice-mix",
                    "Traditional Bengali five spice mix consisting of cumin, fennel, mustard, fenugreek, and nigella seeds. Sourced directly from growers.",
                    comboPacks.getId(), "Rasoi Sutra",
                    Arrays.asList("/src/assets/products/panch_phoron.jpg"),
                    110.0, 0.0, 80,
                    Arrays.asList("100g", "200g"),
                    Arrays.asList("Cumin Seeds", "Fennel Seeds", "Mustard Seeds", "Fenugreek Seeds", "Nigella Seeds"),
                    true, false, LocalDateTime.now(), LocalDateTime.now());

            Product p6 = new Product(null, "Rasoi Sutra Kitchen King Combo", "rasoi-sutra-kitchen-king-combo",
                    "An ultimate spice combo pack containing 250g of Organic Turmeric, Kashmiri Lal Mirch, and Premium Coriander Powder. The perfect starter kit for every home chef.",
                    comboPacks.getId(), "Rasoi Sutra",
                    Arrays.asList("/src/assets/products/combo_packs.jpg"),
                    350.0, 20.0, 50,
                    Arrays.asList("750g Set"),
                    Arrays.asList("Turmeric Powder 250g", "Kashmiri Chilli Powder 250g", "Coriander Powder 250g"),
                    true, true, LocalDateTime.now(), LocalDateTime.now());

            productRepository.saveAll(Arrays.asList(p1, p2, p3, p4, p5, p6));
            logger.info("Products seeded successfully.");
        }
    }
}
