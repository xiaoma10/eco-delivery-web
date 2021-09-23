package com.eco.delivery.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.eco.delivery.ResourceNotFoundException;
import com.eco.delivery.model.DispatchCenter;
import com.eco.delivery.repository.DispatchCenterRepository;

import com.eco.delivery.util.CenterID;
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
@RequestMapping(path = "dispatch_center")
public class DispatchCenterController {

    @Autowired
    private DispatchCenterRepository dispatchRepository;


    @GetMapping
    public List<DispatchCenter> getAllDispatch() {
        return this.dispatchRepository.findAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<DispatchCenter> getDispatchById(@PathVariable(value = "id") Integer dispatchId)
            throws ResourceNotFoundException {
        DispatchCenter dispatch = dispatchRepository.findDispatchCenterById(CenterID.values()[dispatchId])
                .orElseThrow(() -> new ResourceNotFoundException("Dispatch not found for this id : " + dispatchId));;
        return ResponseEntity.ok().body(dispatch);
    }

    @PostMapping
    public DispatchCenter createDispatch(@RequestBody DispatchCenter dispatch) {
        return dispatchRepository.save(dispatch);
    }

    @PutMapping("{id}")
    public ResponseEntity<DispatchCenter> updateDispatch(@PathVariable(value = "id") Integer dispatchId,
                                                         @RequestBody DispatchCenter dispatchDetails) throws ResourceNotFoundException {
        DispatchCenter dispatch = dispatchRepository.findDispatchCenterById(CenterID.values()[dispatchId])
                .orElseThrow(() -> new ResourceNotFoundException("Dispatch not found for this id : " + dispatchId));
        if (dispatchDetails.getLocation() != null) {
            dispatch.setLocation(dispatchDetails.getLocation());
        }
        if (dispatchDetails.getCenterLat() != null) {
            dispatch.setCenterLat(dispatchDetails.getCenterLat());
        }
        if (dispatchDetails.getCenterLng() != null) {
            dispatch.setCenterLng(dispatchDetails.getCenterLng());
        }
        if (dispatchDetails.getCurrentRobotAmount() != null) {
            dispatch.setCurrentRobotAmount(dispatchDetails.getCurrentRobotAmount());
        }
        if (dispatchDetails.getCurrentDroneAmount() != null) {
            dispatch.setCurrentDroneAmount(dispatchDetails.getCurrentDroneAmount());
        }
        final DispatchCenter updatedDispatch = dispatchRepository.save(dispatch);
        return ResponseEntity.ok(updatedDispatch);
    }

    @DeleteMapping("{id}")
    public Map<String, Boolean> deleteDispatch(@PathVariable(value = "id") Long agentId)
            throws ResourceNotFoundException {
        DispatchCenter employee = dispatchRepository.findById(agentId)
                .orElseThrow(() -> new ResourceNotFoundException("Dispatch center not found for this id : " + agentId));

        dispatchRepository.delete(employee);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
