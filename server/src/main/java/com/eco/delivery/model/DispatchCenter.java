package com.eco.delivery.model;

import com.eco.delivery.util.CenterID;

import javax.persistence.*;

@Entity
@Table(name = "dispatch_center")
public class DispatchCenter {

    @Id
    private CenterID id;

    @Column(name = "location")
    private String location;

    @Column(name = "total_drone_amount")
    private Integer totalDroneAmount;

    @Column(name = "total_robot_amount")
    private Integer totalRobotAmount;

    @Column(name = "current_drone_amount")
    private Integer currentDroneAmount;

    @Column(name = "current_robot_amount")
    private Integer currentRobotAmount;

    @Column(name = "center_lat")
    private Double centerLat;

    @Column(name = "center_lng")
    private Double centerLng;

    @Column(name = "robot_dist_to_dep")
    private Double robotDistanceToDeparture;

    @Column(name = "drone_dist_to_dep")
    private Double droneDistanceToDeparture;
    /*
    @OneToMany(mappedBy = "dispatchCenter", cascade = CascadeType.ALL)
    private Set<Agent> agents;
    */

    public DispatchCenter() {
    }


    public DispatchCenter(CenterID id, String location, Integer totalDroneAmount, Integer totalRobotAmount, Integer currentDroneAmount, Integer currentRobotAmount) {
        this.id = id;
        this.location = location;
        this.totalDroneAmount = totalDroneAmount;
        this.totalRobotAmount = totalRobotAmount;
        this.currentDroneAmount = currentDroneAmount;
        this.currentRobotAmount = currentRobotAmount;
    }


    public DispatchCenter(CenterID id, String location, Integer totalDroneAmount, Integer totalRobotAmount, Integer currentDroneAmount, Integer currentRobotAmount, Double centerLat, Double centerLng) {
        this.id = id;
        this.location = location;
        this.totalDroneAmount = totalDroneAmount;
        this.totalRobotAmount = totalRobotAmount;
        this.currentDroneAmount = currentDroneAmount;
        this.currentRobotAmount = currentRobotAmount;
        this.centerLat = centerLat;
        this.centerLng = centerLng;
    }

    /**
     * @return Long return the center_id
     */
    public CenterID getId() {
        return id;
    }

    /**
     * @return String return the location
     */
    public String getLocation() {
        return location;
    }

    /**
     * @param location the location to set
     */
    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getTotalDroneAmount() {
        return totalDroneAmount;
    }

    public void setTotalDroneAmount(Integer totalDroneAmount) {
        this.totalDroneAmount = totalDroneAmount;
    }

    public Integer getTotalRobotAmount() {
        return totalRobotAmount;
    }

    public void setTotalRobotAmount(Integer totalRobotAmount) {
        this.totalRobotAmount = totalRobotAmount;
    }

    public Integer getCurrentDroneAmount() {
        return currentDroneAmount;
    }

    public void setCurrentDroneAmount(Integer currentDroneAmount) {
        this.currentDroneAmount = currentDroneAmount;
    }

    public Integer getCurrentRobotAmount() {
        return currentRobotAmount;
    }

    public void setCurrentRobotAmount(Integer currentRobotAmount) {
        this.currentRobotAmount = currentRobotAmount;
    }

    public Double getCenterLat() {
        return centerLat;
    }

    public void setCenterLat(Double centerLat) {
        this.centerLat = centerLat;
    }

    public Double getCenterLng() {
        return centerLng;
    }

    public void setCenterLng(Double centerLng) {
        this.centerLng = centerLng;
    }

    public Double getRobotDistanceToDeparture() {
        return robotDistanceToDeparture;
    }

    public void setRobotDistanceToDeparture(Double robotDistanceToDeparture) {
        this.robotDistanceToDeparture = robotDistanceToDeparture;
    }

    public Double getDroneDistanceToDeparture() {
        return droneDistanceToDeparture;
    }

    public void setDroneDistanceToDeparture(Double droneDistanceToDeparture) {
        this.droneDistanceToDeparture = droneDistanceToDeparture;
    }

    /*
    public Set<Agent> getAgents() {
        return agents;
    }

    public void setAgents(Set<Agent> agents) {
        this.agents = agents;
    }
    */

    @Override
    public String toString() {
        return "DispatchCenter{" +
                "id=" + id +
                ", location='" + location + '\'' +
                ", totalDroneAmount=" + totalDroneAmount +
                ", totalRobotAmount=" + totalRobotAmount +
                ", currentDroneAmount=" + currentDroneAmount +
                ", currentRobotAmount=" + currentRobotAmount +
                ", centerLat=" + centerLat +
                ", centerLng=" + centerLng +
                '}';
    }
}