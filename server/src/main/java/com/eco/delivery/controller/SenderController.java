package com.eco.delivery.controller;

import com.eco.delivery.exception.ResourceNotFoundException;
import com.eco.delivery.model.Sender;
import com.eco.delivery.repository.SenderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "sender")
public class SenderController {

    @Autowired
    private SenderRepository senderRepository;


    @GetMapping
    public List<Sender> getAllSender() {
        return this.senderRepository.findAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<Sender> getSenderById(@PathVariable(value = "id") Long senderId)
            throws ResourceNotFoundException {
        Sender sender = senderRepository.findById(senderId)
                .orElseThrow(() -> new ResourceNotFoundException("Sender not found for this id : " + senderId));
        return ResponseEntity.ok().body(sender);
    }

    @PostMapping
    public Sender createSender(@RequestBody Sender sender) {
        return senderRepository.save(sender);
    }

    @PutMapping("{id}")
    public ResponseEntity<Sender> updateSender(@PathVariable(value = "id") Long senderId,
                                               @RequestBody Sender senderDetails) throws ResourceNotFoundException {
        Sender sender = senderRepository.findById(senderId)
                .orElseThrow(() -> new ResourceNotFoundException("Sender not found for this id : " + senderId));

        sender.setFirstName(senderDetails.getFirstName());
        sender.setLastName(senderDetails.getLastName());
        sender.setAddress(senderDetails.getAddress());
        sender.setPhoneNumber(senderDetails.getPhoneNumber());
        sender.setEmail(senderDetails.getEmail());
        final Sender updatedSender = senderRepository.save(sender);
        return ResponseEntity.ok(updatedSender);
    }

    @DeleteMapping("{id}")
    public Map<String, Boolean> deleteSender(@PathVariable(value = "id") Long senderId)
            throws ResourceNotFoundException {
        Sender sender = senderRepository.findById(senderId)
                .orElseThrow(() -> new ResourceNotFoundException("Sender not found for this id : " + senderId));

        senderRepository.delete(sender);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
