package com.rasoisutra.ecom.config;

import com.rasoisutra.ecom.models.Admin;
import com.rasoisutra.ecom.models.Category;
import com.rasoisutra.ecom.models.Product;
import com.rasoisutra.ecom.models.ProductVariant;
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
        admin.setEncryptedPassword(passwordEncoder.encode("rasoi_sutra_admin2026"));
        adminRepository.save(admin);
        logger.info("New admin account seeded successfully with password: rasoi_sutra_admin2026");
    }

    private void seedCategoriesAndProducts() {
        // Clear all old database items to prevent schema clash
        productRepository.deleteAll();
        categoryRepository.deleteAll();
        logger.info("Cleared old database categories and products.");

        // Create Categories
        Category groundSpices = new Category(null, "Ground Spices", "https://res.cloudinary.com/ezfi6qwa/image/upload/v1786171368/rasoi-sutra/products/turmeric_powder.jpg");
        Category wholeSpices = new Category(null, "Whole Spices", "https://res.cloudinary.com/ezfi6qwa/image/upload/v1786171370/rasoi-sutra/products/cumin_powder.jpg");
        Category spiceBlends = new Category(null, "Spice Blends", "https://res.cloudinary.com/ezfi6qwa/image/upload/v1786171371/rasoi-sutra/products/garam_masala.jpg");

        groundSpices = categoryRepository.save(groundSpices);
        wholeSpices = categoryRepository.save(wholeSpices);
        spiceBlends = categoryRepository.save(spiceBlends);
        logger.info("Seeded categories Ground Spices, Whole Spices, Spice Blends.");

        // 1. Turmeric Powder (हल्दी पाउडर)
        Product haldi = new Product();
        haldi.setProductName("Salem Turmeric Powder");
        haldi.setSlug("turmeric-powder");
        haldi.setCategory("Ground Spices");
        haldi.setBrandName("Rasoi Sutra");
        haldi.setShortDescription("100% Pure & Natural Salem turmeric powder with high curcumin content.");
        haldi.setFullDescription("Sourced from the fertile lands of Salem, Rasoi Sutra Turmeric Powder is cold-ground at low RPM to preserve natural essential oils and vibrant golden yellow color. Lab-tested with zero chemical adulteration or starch fillers.");
        haldi.setImage("https://res.cloudinary.com/ezfi6qwa/image/upload/v1786171368/rasoi-sutra/products/turmeric_powder.jpg");
        haldi.setGalleryImages(Arrays.asList("https://res.cloudinary.com/ezfi6qwa/image/upload/v1786171368/rasoi-sutra/products/turmeric_powder.jpg"));
        haldi.setVariants(Arrays.asList(
            new ProductVariant("100g", 65.0, 55.0, 15.4, 120, "RS-TUR-100"),
            new ProductVariant("250g", 145.0, 120.0, 17.2, 150, "RS-TUR-250"),
            new ProductVariant("500g", 280.0, 230.0, 17.8, 90, "RS-TUR-500"),
            new ProductVariant("1kg", 540.0, 440.0, 18.5, 50, "RS-TUR-1000")
        ));
        haldi.setIngredients(Arrays.asList("100% Pure Turmeric Rhizomes"));
        haldi.setShelfLife("12 Months");
        haldi.setStorageInstructions("Store in a cool, dry place in an airtight glass jar.");
        haldi.setCountryOfOrigin("India");
        haldi.setIsBestSeller(true);
        haldi.setIsFeatured(true);
        haldi.setRating(4.9);
        haldi.setReviewsCount(48);
        haldi.setAvailable(true);
        haldi.setTags(Arrays.asList("turmeric", "haldi", "ground spices", "pure"));

        // 2. Red Chilli Powder (लाल मिर्च पाउडर)
        Product chilli = new Product();
        chilli.setProductName("Guntur Red Chilli Powder");
        chilli.setSlug("red-chilli-powder");
        chilli.setCategory("Ground Spices");
        chilli.setBrandName("Rasoi Sutra");
        chilli.setShortDescription("Sun-dried hand-picked Guntur chillies, cold-ground with no artificial color.");
        chilli.setFullDescription("Made exclusively from stemless, whole Guntur red chillies. Gives rich natural red color and a balanced, aromatic warmth without any Sudan dyes or added colors. Perfect for authentic Indian curries and gravies.");
        chilli.setImage("https://res.cloudinary.com/ezfi6qwa/image/upload/v1786171369/rasoi-sutra/products/red_chilli_powder.jpg");
        chilli.setGalleryImages(Arrays.asList("https://res.cloudinary.com/ezfi6qwa/image/upload/v1786171369/rasoi-sutra/products/red_chilli_powder.jpg"));
        chilli.setVariants(Arrays.asList(
            new ProductVariant("100g", 75.0, 65.0, 13.3, 100, "RS-CHL-100"),
            new ProductVariant("250g", 175.0, 145.0, 17.1, 140, "RS-CHL-250"),
            new ProductVariant("500g", 330.0, 280.0, 15.1, 80, "RS-CHL-500"),
            new ProductVariant("1kg", 640.0, 540.0, 15.6, 40, "RS-CHL-1000")
        ));
        chilli.setIngredients(Arrays.asList("100% Pure Red Chilli"));
        chilli.setShelfLife("12 Months");
        chilli.setStorageInstructions("Keep away from moisture and direct sunlight.");
        chilli.setCountryOfOrigin("India");
        chilli.setIsBestSeller(true);
        chilli.setIsFeatured(true);
        chilli.setRating(4.9);
        chilli.setReviewsCount(56);
        chilli.setAvailable(true);
        chilli.setTags(Arrays.asList("chilli", "mirch", "red chilli", "spicy"));

        // 3. Coriander Powder (धनिया पाउडर)
        Product coriander = new Product();
        coriander.setProductName("Ramganj Coriander Powder");
        coriander.setSlug("coriander-powder");
        coriander.setCategory("Ground Spices");
        coriander.setBrandName("Rasoi Sutra");
        coriander.setShortDescription("Fresh green coriander seeds slowly cold-ground to preserve volatile oils and aroma.");
        coriander.setFullDescription("Sourced from Ramganj Mandi, renowned for the sweetest and most fragrant whole coriander. Cleaned, destoned, and pulverized without heat generation to ensure the authentic aroma fills your kitchen when cooked.");
        coriander.setImage("https://res.cloudinary.com/ezfi6qwa/image/upload/v1786171370/rasoi-sutra/products/coriander_powder.jpg");
        coriander.setGalleryImages(Arrays.asList("https://res.cloudinary.com/ezfi6qwa/image/upload/v1786171370/rasoi-sutra/products/coriander_powder.jpg"));
        coriander.setVariants(Arrays.asList(
            new ProductVariant("100g", 60.0, 50.0, 16.7, 110, "RS-COR-100"),
            new ProductVariant("250g", 140.0, 115.0, 17.8, 130, "RS-COR-250"),
            new ProductVariant("500g", 260.0, 215.0, 17.3, 75, "RS-COR-500"),
            new ProductVariant("1kg", 500.0, 410.0, 18.0, 45, "RS-COR-1000")
        ));
        coriander.setIngredients(Arrays.asList("100% Pure Coriander Seeds"));
        coriander.setShelfLife("12 Months");
        coriander.setStorageInstructions("Store in a cool dry place.");
        coriander.setCountryOfOrigin("India");
        coriander.setIsBestSeller(false);
        coriander.setIsFeatured(true);
        coriander.setRating(4.8);
        coriander.setReviewsCount(31);
        coriander.setAvailable(true);
        coriander.setTags(Arrays.asList("coriander", "dhaniya", "ground spice"));

        // 4. Cumin Powder (जीरा पाउडर)
        Product cumin = new Product();
        cumin.setProductName("Roasted Cumin Powder");
        cumin.setSlug("cumin-powder");
        cumin.setCategory("Ground Spices");
        cumin.setBrandName("Rasoi Sutra");
        cumin.setShortDescription("Earthy and fragrant roasted cumin seeds, finely powdered for raitas, curries & snacks.");
        cumin.setFullDescription("Carefully roasted bold cumin seeds from Gujarat. Imparts an irresistible smoky, nutty aroma to raitas, chaats, buttermilk, and dal tadka. 100% natural with no artificial aroma enhancers.");
        cumin.setImage("https://res.cloudinary.com/ezfi6qwa/image/upload/v1786171370/rasoi-sutra/products/cumin_powder.jpg");
        cumin.setGalleryImages(Arrays.asList("https://res.cloudinary.com/ezfi6qwa/image/upload/v1786171370/rasoi-sutra/products/cumin_powder.jpg"));
        cumin.setVariants(Arrays.asList(
            new ProductVariant("100g", 85.0, 72.0, 15.3, 100, "RS-CUM-100"),
            new ProductVariant("250g", 195.0, 165.0, 15.4, 120, "RS-CUM-250"),
            new ProductVariant("500g", 380.0, 315.0, 17.1, 70, "RS-CUM-500"),
            new ProductVariant("1kg", 720.0, 599.0, 16.8, 35, "RS-CUM-1000")
        ));
        cumin.setIngredients(Arrays.asList("100% Roasted Cumin Seeds"));
        cumin.setShelfLife("12 Months");
        cumin.setStorageInstructions("Keep sealed tightly to protect freshness.");
        cumin.setCountryOfOrigin("India");
        cumin.setIsBestSeller(false);
        cumin.setIsFeatured(true);
        cumin.setRating(4.7);
        cumin.setReviewsCount(27);
        cumin.setAvailable(true);
        cumin.setTags(Arrays.asList("jeera", "cumin", "roasted cumin", "ground spice"));

        // 5. Garam Masala (शाही गरम मसाला)
        Product garamMasala = new Product();
        garamMasala.setProductName("Heritage Shahi Garam Masala");
        garamMasala.setSlug("garam-masala");
        garamMasala.setCategory("Spice Blends");
        garamMasala.setBrandName("Rasoi Sutra");
        garamMasala.setShortDescription("Royal heritage recipe of 15 whole spices for royal aroma and authentic flavor.");
        garamMasala.setFullDescription("A mastercrafted blend of 15 hand-selected whole spices including Green Cardamom, Cinnamon, Cloves, Mace, Star Anise, and Nutmeg. Adds an authentic royal touch and intoxicating aroma to biryanis, curries, and paneer dishes.");
        garamMasala.setImage("https://res.cloudinary.com/ezfi6qwa/image/upload/v1786171371/rasoi-sutra/products/garam_masala.jpg");
        garamMasala.setGalleryImages(Arrays.asList("https://res.cloudinary.com/ezfi6qwa/image/upload/v1786171371/rasoi-sutra/products/garam_masala.jpg"));
        garamMasala.setVariants(Arrays.asList(
            new ProductVariant("100g", 110.0, 89.0, 19.1, 90, "RS-GM-100"),
            new ProductVariant("250g", 260.0, 215.0, 17.3, 110, "RS-GM-250"),
            new ProductVariant("500g", 490.0, 410.0, 16.3, 60, "RS-GM-500"),
            new ProductVariant("1kg", 950.0, 799.0, 15.9, 30, "RS-GM-1000")
        ));
        garamMasala.setIngredients(Arrays.asList("Green Cardamom", "Black Cardamom", "Cinnamon", "Cloves", "Nutmeg", "Mace", "Star Anise", "Black Pepper", "Coriander", "Cumin"));
        garamMasala.setShelfLife("12 Months");
        garamMasala.setStorageInstructions("Store in an airtight jar immediately after opening.");
        garamMasala.setCountryOfOrigin("India");
        garamMasala.setIsBestSeller(true);
        garamMasala.setIsFeatured(true);
        garamMasala.setRating(4.9);
        garamMasala.setReviewsCount(62);
        garamMasala.setAvailable(true);
        garamMasala.setTags(Arrays.asList("garam masala", "shahi", "blend", "aromatic"));

        // 6. Black Pepper Powder (काली मिर्च पाउडर)
        Product blackPepper = new Product();
        blackPepper.setProductName("Malabar Black Pepper Powder");
        blackPepper.setSlug("black-pepper-powder");
        blackPepper.setCategory("Ground Spices");
        blackPepper.setBrandName("Rasoi Sutra");
        blackPepper.setShortDescription("Bold Malabar tellicherry black peppercorns crushed fresh for sharp pungency.");
        blackPepper.setFullDescription("Known as the 'Black Gold' of Kerala, our Malabar black pepper is harvested at peak maturity and gently milled to deliver sharp heat, complex piney aroma, and piperine-rich immunity benefits.");
        blackPepper.setImage("https://res.cloudinary.com/ezfi6qwa/image/upload/v1786171372/rasoi-sutra/products/black_pepper_powder.jpg");
        blackPepper.setGalleryImages(Arrays.asList("https://res.cloudinary.com/ezfi6qwa/image/upload/v1786171372/rasoi-sutra/products/black_pepper_powder.jpg"));
        blackPepper.setVariants(Arrays.asList(
            new ProductVariant("100g", 130.0, 105.0, 19.2, 85, "RS-BPP-100"),
            new ProductVariant("250g", 310.0, 255.0, 17.7, 100, "RS-BPP-250"),
            new ProductVariant("500g", 590.0, 490.0, 16.9, 50, "RS-BPP-500"),
            new ProductVariant("1kg", 1150.0, 950.0, 17.4, 25, "RS-BPP-1000")
        ));
        blackPepper.setIngredients(Arrays.asList("100% Malabar Black Pepper"));
        blackPepper.setShelfLife("12 Months");
        blackPepper.setStorageInstructions("Keep sealed tightly away from direct sunlight.");
        blackPepper.setCountryOfOrigin("India");
        blackPepper.setIsBestSeller(false);
        blackPepper.setIsFeatured(true);
        blackPepper.setRating(4.9);
        blackPepper.setReviewsCount(39);
        blackPepper.setAvailable(true);
        blackPepper.setTags(Arrays.asList("black pepper", "kali mirch", "ground spice", "malabar"));

        productRepository.saveAll(Arrays.asList(haldi, chilli, coriander, cumin, garamMasala, blackPepper));
        logger.info("Seeded all 6 official Rasoi Sutra products from Cloudinary CDN successfully.");
    }
}
