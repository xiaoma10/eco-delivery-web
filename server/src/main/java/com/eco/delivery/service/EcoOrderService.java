package com.eco.delivery.service;

import com.eco.delivery.exception.ResourceNotFoundException;
import com.eco.delivery.model.DispatchCenter;
import com.eco.delivery.model.EcoOrder;
import com.eco.delivery.repository.DispatchCenterRepository;
import com.eco.delivery.repository.EcoOrderRepository;
import com.eco.delivery.util.AgentType;
import com.eco.delivery.util.CenterID;
import com.eco.delivery.util.OrderStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.*;

@Service
public class EcoOrderService {

    private final EcoOrderRepository ecoOrderRepository;
    private final DispatchCenterRepository dispatchRepository;

    @Autowired
    public EcoOrderService(EcoOrderRepository ecoOrderRepository, DispatchCenterRepository dispatchRepository) {
        this.ecoOrderRepository = ecoOrderRepository;
        this.dispatchRepository = dispatchRepository;
    }

    public List<EcoOrder> getOrders() {
        List<EcoOrder> orders = ecoOrderRepository.findAll();
        ZoneId zoneId = ZoneId.of( "America/Los_Angeles" );
        for (EcoOrder order : orders) {
            order.setOrderedTime(order.getOrderedTime().atZone(zoneId).toLocalDateTime());
            order.setPickupTime(order.getPickupTime().atZone(zoneId).toLocalDateTime());
            order.setDeliveredTime(order.getDeliveredTime().atZone(zoneId).toLocalDateTime());
        }
        return orders;
    }


    public void checkStatus(EcoOrder order) {
        CenterID centerId = order.getCenterID();
        DispatchCenter center = dispatchRepository.findCenterById(centerId);

        LocalDateTime timeNow= LocalDateTime.now();
        // convert local current time to LA time
        //ZoneId zoneId = ZoneId.of( "America/Los_Angeles" );
        //ZonedDateTime timeNow = localTimeNow.atZone( zoneId );

        if (order.getStatus() == OrderStatus.CANCELED) {
            ecoOrderRepository.save(order);
            return;
        }
        else if (timeNow.isAfter(order.getDeliveredTime())) {
            order.setStatus(OrderStatus.COMPLETED);
            if (order.getAgentType() == AgentType.DRONE) {
                center.setCurrentDroneAmount(center.getCurrentDroneAmount() + 1);
            }
            else {
                center.setCurrentRobotAmount(center.getCurrentRobotAmount() + 1);
            }
        }
        else if (timeNow.isAfter(order.getPickupTime())) {
            order.setStatus(OrderStatus.PICKED);
        }
        else {
            order.setStatus(OrderStatus.PLACED);
        }
        ecoOrderRepository.save(order);
        return;
    }


    public ResponseEntity<Map<String, List<EcoOrder>>> getOrdersByUserId(Integer id) throws ResourceNotFoundException {
        List<EcoOrder> orders = ecoOrderRepository.findOrderByUserId(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found for this user id : " + id));
        Map<String, List<EcoOrder>> orderMap = new HashMap<>();
        orderMap.put("PLACED", new ArrayList<>());
        orderMap.put("PICKED", new ArrayList<>());
        orderMap.put("COMPLETED", new ArrayList<>());
        orderMap.put("CANCELED", new ArrayList<>());

        for (EcoOrder order : orders) {
            checkStatus(order);
            orderMap.get(order.getStatus().name()).add(order);
        }
        return ResponseEntity.ok().body(orderMap);
    }


    public ResponseEntity<EcoOrder> getOrderDetailByOrderId(UUID id) throws ResourceNotFoundException{
        EcoOrder ecoOrder = ecoOrderRepository.getOrderDetailByOrderId(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found for this order id : " + id));

        checkStatus(ecoOrder);
        return ResponseEntity.ok().body(ecoOrder);
    }

    public ResponseEntity<EcoOrder> getAgentById(UUID orderNumber) throws ResourceNotFoundException {
        EcoOrder ecoOrder = ecoOrderRepository.findById(orderNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found for this id : " + orderNumber));
        return ResponseEntity.ok().body(ecoOrder);
    }

    public ResponseEntity<EcoOrder> createOrder(EcoOrder ecoOrder) throws ResourceNotFoundException {
        /*
        CenterID centerID = ecoOrder.getCenterID();
        AgentType agentType = ecoOrder.getAgentType();
        DispatchCenter center = dispatchRepository.findDispatchCenterById(centerID);

        if (agentType == AgentType.ROBOT) {
            center.setCurrentRobotAmount(center.getCurrentRobotAmount() - 1);
        }
        else {
            center.setCurrentDroneAmount(center.getCurrentDroneAmount() - 1);
        }
         */
        final EcoOrder createdOrder = ecoOrderRepository.save(ecoOrder);
        return ResponseEntity.ok().body(createdOrder);
    }

    public ResponseEntity<EcoOrder> updateOrder(UUID orderNumber, EcoOrder ecoOrderDetails) throws ResourceNotFoundException {
        EcoOrder ecoOrder = ecoOrderRepository.findById(orderNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found for this id : " + orderNumber));

        ecoOrder.setAccount(ecoOrderDetails.getAccount());
        //ecoOrder.setAgent(ecoOrderDetails.getAgent());
        ecoOrder.setDeparture(ecoOrderDetails.getDeparture());
        ecoOrder.setDestination(ecoOrderDetails.getDestination());
        ecoOrder.setStatus(ecoOrderDetails.getStatus());
        ecoOrder.setSender(ecoOrderDetails.getSender());
        ecoOrder.setRecipient(ecoOrderDetails.getRecipient());
        final EcoOrder updatedEcoOrder = ecoOrderRepository.save(ecoOrder);
        return ResponseEntity.ok(updatedEcoOrder);
    }

    @Transactional
    public ResponseEntity<EcoOrder> updateOrderStatus(UUID orderNumber, Integer statusNum) throws ResourceNotFoundException {
        EcoOrder ecoOrder = ecoOrderRepository.findById(orderNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found for this id: "+ orderNumber));

        if (statusNum >= 0 && statusNum <=3) {
            ecoOrder.setStatus(statusNum);
        } else {
            throw new IllegalArgumentException("status number can only be 0 - 3!");
        }
        final EcoOrder updatedEcoOrder = ecoOrderRepository.save(ecoOrder);
        return ResponseEntity.ok(updatedEcoOrder);
    }

    public Map<String, Boolean> deleteOrder(UUID orderNumber) throws ResourceNotFoundException {
        EcoOrder ecoOrder = ecoOrderRepository.findById(orderNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found for this id : " + orderNumber));

        ecoOrderRepository.delete(ecoOrder);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
