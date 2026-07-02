package com.rasoisutra.ecom.services;

import com.rasoisutra.ecom.models.ContactMessage;
import com.rasoisutra.ecom.repositories.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ContactService {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findAllByOrderByCreatedAtDesc();
    }

    public ContactMessage saveMessage(ContactMessage message) {
        message.setCreatedAt(LocalDateTime.now());
        return contactMessageRepository.save(message);
    }

    public void deleteMessage(String id) {
        contactMessageRepository.deleteById(id);
    }
}
