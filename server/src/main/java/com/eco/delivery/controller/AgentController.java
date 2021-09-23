package com.eco.delivery.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.eco.delivery.exception.ResourceNotFoundException;
import com.eco.delivery.model.Agent;
import com.eco.delivery.repository.AgentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(path = "agent")
public class AgentController {

    @Autowired
    private AgentRepository agentRepository;


    @GetMapping
    public List<Agent> getAllAgent() {
        return this.agentRepository.findAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<Agent> getAgentById(@PathVariable(value = "id") Long agentId)
            throws ResourceNotFoundException {
        Agent agent = agentRepository.findById(agentId)
                .orElseThrow(() -> new ResourceNotFoundException("Agent not found for this id : " + agentId));
        return ResponseEntity.ok().body(agent);
    }

    @PostMapping
    public Agent createAgent(@RequestBody Agent agent) {
        return agentRepository.save(agent);
    }

    @PutMapping("{id}")
    public ResponseEntity<Agent> updateAgent(@PathVariable(value = "id") Long agentId,
                                             @RequestBody Agent agentDetails) throws ResourceNotFoundException {
        Agent agent = agentRepository.findById(agentId)
                .orElseThrow(() -> new ResourceNotFoundException("Agent not found for this id : " + agentId));

        agent.setCenter(agentDetails.getCenter());
        agent.setType(agentDetails.getType());
        agent.setStatus(agentDetails.getStatus());
        final Agent updatedEmployee = agentRepository.save(agent);
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("{id}")
    public Map<String, Boolean> deleteAgent(@PathVariable(value = "id") Long agentId)
            throws ResourceNotFoundException {
        Agent employee = agentRepository.findById(agentId)
                .orElseThrow(() -> new ResourceNotFoundException("Agent not found for this id : " + agentId));

        agentRepository.delete(employee);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}