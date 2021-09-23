package com.eco.delivery.controller;

import com.eco.delivery.exception.ResourceNotFoundException;
import com.eco.delivery.model.Item;
import com.eco.delivery.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "item")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @GetMapping
    public List<Item> getAllItems() {
        return this.itemRepository.findAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<Item> getItemById(@PathVariable(value = "id") Long itemId)
            throws ResourceNotFoundException {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found for this id : " + itemId));
        return ResponseEntity.ok().body(item);
    }

    @PostMapping
    public Item createItem(@RequestBody Item item) {
        return itemRepository.save(item);
    }

    @PutMapping("{id}")
    public ResponseEntity<Item> updateItem(@PathVariable(value = "id") Long itemId,
                                           @RequestBody Item itemDetails) throws ResourceNotFoundException {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found for this id : " + itemId));

        item.setAmount(itemDetails.getAmount());
        item.setWeight(itemDetails.getWeight());
        item.setType(itemDetails.getType());
        item.setIsFragile(itemDetails.getIsFragile());
        final Item updatedItem = itemRepository.save(item);
        return ResponseEntity.ok(updatedItem);
    }
}
