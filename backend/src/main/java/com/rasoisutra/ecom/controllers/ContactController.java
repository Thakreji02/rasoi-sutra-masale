package com.rasoisutra.ecom.controllers;

import com.rasoisutra.ecom.dto.ApiResponse;
import com.rasoisutra.ecom.models.ContactMessage;
import com.rasoisutra.ecom.services.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping("/contacts/submit")
    public ResponseEntity<?> submitMessage(@RequestBody ContactMessage contactMessage) {
        ContactMessage savedMessage = contactService.saveMessage(contactMessage);
        return ResponseEntity.ok(ApiResponse.success("Contact message submitted successfully", savedMessage));
    }

    @GetMapping("/admin/contacts")
    public ResponseEntity<?> getMessages() {
        List<ContactMessage> messages = contactService.getAllMessages();
        return ResponseEntity.ok(ApiResponse.success("Contact messages fetched successfully", messages));
    }

    @DeleteMapping("/admin/contacts/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable String id) {
        contactService.deleteMessage(id);
        return ResponseEntity.ok(ApiResponse.success("Contact message deleted successfully"));
    }
}
