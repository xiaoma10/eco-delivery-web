package com.eco.delivery.controller;

import com.eco.delivery.model.*;
import com.eco.delivery.service.AccountService;
import com.eco.delivery.service.EcoOrderService;
import com.eco.delivery.util.AgentType;
import org.springframework.beans.factory.annotation.Autowired;
import com.eco.delivery.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping(path = "order")
public class OrderController  {

    private final EcoOrderService ecoOrderService;
    private final DispatchCenterController dispatchCenterController;
    private final AccountService accountService;

    public OrderController(EcoOrderService ecoOrderService, DispatchCenterController dispatchCenterController, AccountService accountService) {
        this.ecoOrderService = ecoOrderService;
        this.dispatchCenterController = dispatchCenterController;
        this.accountService = accountService;
    }


    @Autowired

    @GetMapping
    public List<EcoOrder> getAllOrders() {
        return ecoOrderService.getOrders();
    }

    @GetMapping(path="/get_orders/{userId}")
    public ResponseEntity<Map<String, List<EcoOrder>>> getOrdersByUserId(@PathVariable("userId") Integer userId) throws ResourceNotFoundException {
        return ecoOrderService.getOrdersByUserId(userId);
    }

    @GetMapping(path="/get_order_detail/{orderId}")
    public ResponseEntity<EcoOrder> getOrderDetailByOrderId(@PathVariable("orderId") UUID orderNumber) throws ResourceNotFoundException {
        return ecoOrderService.getOrderDetailByOrderId(orderNumber);
    }

    @GetMapping("/get_agent/{id}")
    public ResponseEntity<EcoOrder> getAgentById(@PathVariable(value = "id") UUID orderId) throws ResourceNotFoundException {
        return ecoOrderService.getAgentById(orderId);
    }


    @PostMapping("/place_order")
    public ResponseEntity<EcoOrder> createOrder(@RequestBody EcoOrder ecoOrder) throws ResourceNotFoundException {
        Account account = accountService.getAccountById(ecoOrder.getAccount().getId());
        ecoOrder.setAccount(account);
        ecoOrderService.createOrder(ecoOrder);
        return ResponseEntity.ok().body(ecoOrder);
    }

//    @PutMapping("/update_order/{orderId}")
//    public ResponseEntity<EcoOrder> updateOrder(@PathVariable(value = "orderId") UUID orderId,
//                                                @RequestBody EcoOrder ecoOrderDetails) throws ResourceNotFoundException {
//        return ecoOrderService.updateOrder(orderId, ecoOrderDetails);
//    }

    // update order status by taking a request parameter in the request body;
    @PutMapping("/update_order/{orderId}")
    public ResponseEntity<EcoOrder> updateOrderStatus(@PathVariable("orderId") UUID orderId,
                                                      @RequestParam("status") Integer orderStatus) throws ResourceNotFoundException {
        return ecoOrderService.updateOrderStatus(orderId, orderStatus);
    }


    @DeleteMapping("/delete_order/{orderId}")
    public Map<String, Boolean> deleteOrder(@PathVariable(value = "orderId") UUID orderId)
            throws ResourceNotFoundException {
        return ecoOrderService.deleteOrder(orderId);
    }

    @GetMapping("/get_recommend")
    public List<RecommendedResult> getRecommendation(@RequestParam(name = "robot_distance_0") Double robotDistance0,
                                                     @RequestParam(name = "robot_distance_1") Double robotDistance1,
                                                     @RequestParam(name = "robot_distance_2") Double robotDistance2,
                                                     @RequestParam(name = "robot_distance_des") Double robotDistanceDes,
                                                     @RequestParam(name = "drone_distance_0") Double droneDistance0,
                                                     @RequestParam(name = "drone_distance_1") Double droneDistance1,
                                                     @RequestParam(name = "drone_distance_2") Double droneDistance2,
                                                     @RequestParam(name = "drone_distance_des") Double droneDistanceDes,
                                                     @RequestParam(name = "weight") Integer weight,
                                                     @RequestParam(name = "is_fragile") Boolean isFragile

    ) {

        List<RecommendedResult> recommendedResults = new ArrayList<>();

        // recommendedResults[0]: recommended by our system
        // recommendedResults[1]: the other result
        recommendedResults.add(new RecommendedResult());
        recommendedResults.add(new RecommendedResult());

        List<DispatchCenter> centersByRobots = dispatchCenterController.getAllDispatch();
        List<DispatchCenter> centersByDrones = dispatchCenterController.getAllDispatch();

        centersByRobots.get(0).setRobotDistanceToDeparture(robotDistance0);
        centersByRobots.get(1).setRobotDistanceToDeparture(robotDistance1);
        centersByRobots.get(2).setRobotDistanceToDeparture(robotDistance2);

        centersByDrones.get(0).setDroneDistanceToDeparture(droneDistance0);
        centersByDrones.get(1).setDroneDistanceToDeparture(droneDistance1);
        centersByDrones.get(2).setDroneDistanceToDeparture(droneDistance2);

        boolean allRobotsInUse = true, allDronesInUse = true;
        for (DispatchCenter center : centersByDrones) {
            if (center.getCurrentRobotAmount() > 0) {
                allRobotsInUse = false;
            }
            if (center.getCurrentDroneAmount() > 0) {
                allDronesInUse = false;
            }
        }

        centersByRobots.sort(new Comparator<DispatchCenter>() {
            @Override
            public int compare(DispatchCenter o1, DispatchCenter o2) {
                if (o1.getCurrentRobotAmount() == o2.getCurrentRobotAmount()) {
                    Double distance1 = o1.getRobotDistanceToDeparture();
                    Double distance2 = o2.getRobotDistanceToDeparture();
                    return Double.compare(distance1, distance2);
                }
                return -Integer.compare(o1.getCurrentRobotAmount(),o2.getCurrentRobotAmount());
            }
        });
        centersByDrones.sort(new Comparator<DispatchCenter>() {
            @Override
            public int compare(DispatchCenter o1, DispatchCenter o2) {
                if (o1.getCurrentDroneAmount() == o2.getCurrentDroneAmount()) {
                    Double distance1 = o1.getDroneDistanceToDeparture();
                    Double distance2 = o2.getDroneDistanceToDeparture();
                    return Double.compare(distance1, distance2);
                }
                return -Integer.compare(o1.getCurrentDroneAmount(),o2.getCurrentDroneAmount());
            }
        });

        Double deliveryDistanceByRobot = robotDistanceDes;
        Double deliveryDistanceByDrone = droneDistanceDes;
        Double priceByRobot = deliveryDistanceByRobot * weight * AgentType.ROBOT.getPrice();
        Double priceByDrone = deliveryDistanceByDrone * weight * AgentType.DRONE.getPrice();

        int robotIndex = -1, droneIndex = -1;

        if (weight > AgentType.ROBOT.getLoad()) {
            throw new IllegalStateException("Your order if beyond our capability");
        }
        Double pickUpDistanceByRobot = centersByRobots.get(0).getRobotDistanceToDeparture();
        Double pickUpDistanceByDrone = centersByDrones.get(0).getDroneDistanceToDeparture();
        Double pickUpTimeByRobot = pickUpDistanceByRobot / AgentType.ROBOT.getVelocity();
        Double pickUpTimeByDrone = pickUpDistanceByDrone / AgentType.DRONE.getVelocity();
        Double timeByRobot = (deliveryDistanceByRobot + pickUpDistanceByRobot) / AgentType.ROBOT.getVelocity();
        Double timeByDrone = (deliveryDistanceByDrone + pickUpDistanceByDrone) / AgentType.DRONE.getVelocity();
        Double costPerformanceByRobot = 1.0d / (timeByRobot * priceByRobot);
        Double costPerformanceByDrone = 1.0d / (timeByDrone * priceByDrone);

        if (weight > AgentType.DRONE.getLoad() || allDronesInUse || costPerformanceByRobot > costPerformanceByDrone) {
            robotIndex = 0;
            droneIndex = 1;
        } else if (isFragile || allRobotsInUse || costPerformanceByDrone > costPerformanceByRobot) {
            droneIndex = 0;
            robotIndex = 1;
        }

        recommendedResults.get(robotIndex).setPrice(priceByRobot);
        recommendedResults.get(robotIndex).setAgentType(AgentType.ROBOT);
        recommendedResults.get(robotIndex).setCenterID(centersByRobots.get(0).getId());
        recommendedResults.get(robotIndex).setPickUpTime(LocalDateTime.now().plusSeconds((long)(pickUpTimeByRobot * 3600)));
        recommendedResults.get(robotIndex).setEstimatedArriveTime(LocalDateTime.now().plusSeconds((long)(timeByRobot * 3600)));
        recommendedResults.get(robotIndex).setCenterLocation(centersByRobots.get(0).getLocation());

        recommendedResults.get(droneIndex).setPrice(priceByDrone);
        recommendedResults.get(droneIndex).setAgentType(AgentType.DRONE);
        recommendedResults.get(droneIndex).setCenterID(centersByDrones.get(0).getId());
        recommendedResults.get(droneIndex).setPickUpTime(LocalDateTime.now().plusSeconds((long)(pickUpTimeByDrone * 3600)));
        recommendedResults.get(droneIndex).setEstimatedArriveTime(LocalDateTime.now().plusSeconds((long)(timeByDrone * 3600)));
        recommendedResults.get(droneIndex).setCenterLocation(centersByDrones.get(0).getLocation());

        return recommendedResults;
    }
}
