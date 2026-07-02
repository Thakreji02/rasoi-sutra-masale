package com.rasoisutra.ecom.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, String> home() {
        Map<String, String> status = new HashMap<>();
        status.put("brand", "Rasoi Sutra API");
        status.put("tagline", "Har Rasoi Ka Asli Swad");
        status.put("status", "ACTIVE");
        status.put("message", "Welcome to Rasoi Sutra Premium Indian Spices REST Web Services!");
        return status;
    }
}
