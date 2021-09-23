package com.eco.delivery.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.eco.delivery.util.AgentType;
import com.eco.delivery.util.CenterID;
import com.eco.delivery.util.OrderStatus;
import org.apache.tomcat.jni.Local;
import org.hibernate.annotations.GenericGenerator;


import javax.persistence.*;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity(name = "EcoOrder")
@Table(name = "eco_order")
public class EcoOrder {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "order_number", updatable = false, nullable = false)
    private UUID orderNumber;

    @Column(name = "departure")
    private String departure;

    @Column (name = "dep_lat")
    private Double depLat;

    @Column (name = "dep_lng")
    private Double depLng;

    @Column (name = "destination")
    private String destination;

    @Column (name = "des_lat")
    private Double desLat;

    @Column (name = "des_lng")
    private Double desLng;

    @Column(name = "status")
    private OrderStatus status;

    @Column(name = "ordered_time")
    private LocalDateTime orderedTime;

    @Column(name = "pickup_time")
    private LocalDateTime pickupTime;

    @Column(name = "delivered_time")
    private LocalDateTime deliveredTime;

    @Column(name = "cost")
    private Double cost;

    @Column(name = "rating")
    private Integer rating;

    @Column(name = "center_id")
    private CenterID centerID;

    @Column(name = "agent_type")
    private AgentType agentType;

    //@OneToOne()
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="sender_id_fk")
    private Sender sender;

    //@OneToOne()
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="recipient_id_fk")
    private Recipient recipient;

    //@OneToOne()
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="item_id_fk")
    private Item item;

    /*
    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
    @NotFound(action= NotFoundAction.IGNORE)
    @JsonIgnoreProperties("ecoorder")
    private Agent agent;
    */

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "account_id_fk")
    @JsonIgnoreProperties("eco_order")
    private Account account;

    private Boolean useRecommendation;

    public EcoOrder() {
    }



    public EcoOrder(String departure,
                    String destination,
                    OrderStatus status,
                    LocalDateTime orderedTime) {
        this.departure = departure;
        this.destination = destination;
        this.status = status;
        this.orderedTime = orderedTime;
    }

    public EcoOrder(String departure,
                    String destination,
                    OrderStatus status,
                    CenterID centerID,
                    AgentType agentType,
                    LocalDateTime orderedTime,
                    LocalDateTime pickupTime,
                    LocalDateTime deliveredTime) {
        this.departure = departure;
        this.destination = destination;
        this.status = status;
        this.centerID = centerID;
        this.agentType = agentType;
        this.orderedTime = orderedTime;
        this.pickupTime = pickupTime;
        this.deliveredTime = deliveredTime;
    }


    public EcoOrder(String departure,
                    Double depLat,
                    Double depLng,
                    String destination,
                    Double desLat,
                    Double desLng,
                    OrderStatus status,
                    LocalDateTime orderedTime,
                    LocalDateTime pickupTime,
                    LocalDateTime deliveredTime,
                    Double cost,
                    CenterID centerID,
                    AgentType agentType,
                    Sender sender,
                    Recipient recipient,
                    Item item,
                    Account account,
                    Boolean useRecommendation) {
        this.departure = departure;
        this.depLat = depLat;
        this.depLng = depLng;
        this.destination = destination;
        this.desLat = desLat;
        this.desLng = desLng;
        this.status = status;
        this.orderedTime = orderedTime;
        this.pickupTime = pickupTime;
        this.deliveredTime = deliveredTime;
        this.cost = cost;
        this.centerID = centerID;
        this.agentType = agentType;
        this.sender = sender;
        this.recipient = recipient;
        this.item = item;
        this.account = account;
        this.useRecommendation = useRecommendation;
    }

    public UUID getOrderNumber() {
        return orderNumber;
    }


    public String getDeparture() {
        return departure;
    }

    public void setDeparture(String departure) {
        this.departure = departure;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Double getDepLat() {
        return depLat;
    }

    public void setDepLat(Double depLat) {
        this.depLat = depLat;
    }

    public Double getDepLng() {
        return depLng;
    }

    public void setDepLng(Double depLng) {
        this.depLng = depLng;
    }

    public Double getDesLat() {
        return desLat;
    }

    public void setDesLat(Double desLat) {
        this.desLat = desLat;
    }

    public Double getDesLng() {
        return desLng;
    }

    public void setDesLng(Double desLng) {
        this.desLng = desLng;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public void setStatus(int statusNum) {
        OrderStatus newStatus = OrderStatus.values()[statusNum];
        this.setStatus(newStatus);
    }

    public CenterID getCenterID() {
        return centerID;
    }

    public void setCenterID(CenterID centerID) {
        this.centerID = centerID;
    }

    public AgentType getAgentType() {
        return agentType;
    }

    public void setAgentType(AgentType agentType) {
        this.agentType = agentType;
    }

    public LocalDateTime getOrderedTime() {
        return orderedTime;
    }

    public void setOrderedTime(LocalDateTime ordered_time) {
        this.orderedTime = ordered_time;
    }

    public LocalDateTime getPickupTime() {
        return pickupTime;
    }

    public void setPickupTime(LocalDateTime pickup_time) {
        this.pickupTime = pickup_time;
    }

    public LocalDateTime getDeliveredTime() {
        return deliveredTime;
    }

    public void setDeliveredTime(LocalDateTime delivered_time) {
        this.deliveredTime = delivered_time;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Sender getSender() {
        return sender;
    }

    public void setSender(Sender sender) {
        this.sender = sender;
    }

    public Recipient getRecipient() {
        return recipient;
    }

    public void setRecipient(Recipient recipient) {
        this.recipient = recipient;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    /*
    public Agent getAgent() {
        return agent;
    }

    public void setAgent(Agent agent) {
        this.agent = agent;
    }
    */

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Boolean getUseRecommendation() {
        return useRecommendation;
    }

    public void setUseRecommendation(Boolean useRecommendation) {
        this.useRecommendation = useRecommendation;
    }

    @Override
    public String toString() {
        return "EcoOrder{" +
                "orderNumber=" + orderNumber +
                ", departure='" + departure + '\'' +
                ", depLat=" + depLat +
                ", depLng=" + depLng +
                ", destination='" + destination + '\'' +
                ", desLat=" + desLat +
                ", desLng=" + desLng +
                ", status=" + status +
                ", orderedTime=" + orderedTime +
                ", pickupTime=" + pickupTime +
                ", deliveredTime=" + deliveredTime +
                ", cost=" + cost +
                ", rating=" + rating +
                ", centerID=" + centerID +
                ", agentType=" + agentType +
                ", sender=" + sender +
                ", recipient=" + recipient +
                ", item=" + item +
                ", account=" + account +
                ", useRecommendation=" + useRecommendation +
                '}';
    }
}