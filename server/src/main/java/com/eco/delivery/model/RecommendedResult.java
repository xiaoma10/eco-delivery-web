package com.eco.delivery.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.eco.delivery.util.AgentType;
import com.eco.delivery.util.CenterID;

import java.time.LocalDateTime;

public class RecommendedResult {
    @JsonProperty(value = "agent_type")
    private AgentType agentType;

    @JsonProperty(value = "dispatch_center_id")
    private CenterID centerID;

    @JsonProperty(value = "cost")
    private Double price;

    @JsonProperty(value = "pickip_time")
    private LocalDateTime pickUpTime;

    @JsonProperty(value = "delivery_time")
    private LocalDateTime estimatedArriveTime;

    @JsonProperty(value = "dispatch_location")
    private String centerLocation;

    public RecommendedResult() {
    }

    public AgentType getAgentType() {
        return agentType;
    }

    public void setAgentType(AgentType agentType) {
        this.agentType = agentType;
    }

    public CenterID getCenterID() {
        return centerID;
    }

    public void setCenterID(CenterID centerID) {
        this.centerID = centerID;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public LocalDateTime getEstimatedArriveTime() {
        return estimatedArriveTime;
    }

    public void setEstimatedArriveTime(LocalDateTime estimatedArriveTime) {
        this.estimatedArriveTime = estimatedArriveTime;
    }

    public LocalDateTime getPickUpTime() {
        return pickUpTime;
    }

    public void setPickUpTime(LocalDateTime pickUpTime) {
        this.pickUpTime = pickUpTime;
    }

    public String getCenterLocation() {
        return centerLocation;
    }

    public void setCenterLocation(String centerLocation) {
        this.centerLocation = centerLocation;
    }
}
