package com.eco.delivery.controller;

import com.eco.delivery.exception.ResourceNotFoundException;
import com.eco.delivery.model.Recipient;
import com.eco.delivery.repository.RecipientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "recipient")
public class RecipientController {

    @Autowired
    private RecipientRepository recipientRepository;


    @GetMapping
    public List<Recipient> getAllRecipient() {
        return this.recipientRepository.findAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<Recipient> getRecipientById(@PathVariable(value = "id") Long recipientId)
            throws ResourceNotFoundException {
        Recipient recipient = recipientRepository.findById(recipientId)
                .orElseThrow(() -> new ResourceNotFoundException("Recipient not found for this id : " + recipientId));
        return ResponseEntity.ok().body(recipient);
    }

    @PostMapping
    public Recipient createRecipient(@RequestBody Recipient recipient) {
        return recipientRepository.save(recipient);
    }

    @PutMapping("{id}")
    public ResponseEntity<Recipient> updateRecipient(@PathVariable(value = "id") Long recipientId,
                                                     @RequestBody Recipient recipientDetails) throws ResourceNotFoundException {
        Recipient recipient = recipientRepository.findById(recipientId)
                .orElseThrow(() -> new ResourceNotFoundException("Recipient not found for this id : " + recipientId));

        recipient.setFirstName(recipientDetails.getFirstName());
        recipient.setLastName(recipientDetails.getLastName());
        recipient.setAddress(recipientDetails.getAddress());
        recipient.setPhoneNumber(recipientDetails.getPhoneNumber());
        recipient.setEmail(recipientDetails.getEmail());
        final Recipient updatedRecipient = recipientRepository.save(recipient);
        return ResponseEntity.ok(updatedRecipient);
    }

    @DeleteMapping("{id}")
    public Map<String, Boolean> deleteRecipient(@PathVariable(value = "id") Long recipientId)
            throws ResourceNotFoundException {
        Recipient recipient = recipientRepository.findById(recipientId)
                .orElseThrow(() -> new ResourceNotFoundException("Recipient not found for this id : " + recipientId));

        recipientRepository.delete(recipient);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
