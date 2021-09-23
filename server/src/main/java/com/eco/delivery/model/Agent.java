package com.eco.delivery.model;

import com.eco.delivery.util.AgentStatus;
import com.eco.delivery.util.AgentType;

import javax.persistence.*;

@Entity(name = "Agent")
@Table(name = "agent")
public class Agent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private AgentType type;

    private AgentStatus status;

    /*
    @OneToOne()
    @JoinColumn(name = "order_number_fk")
    @NotFound(action= NotFoundAction.IGNORE)
    @JsonIgnoreProperties("agent")
    private EcoOrder order;
    */

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "center_id_fk")
    private DispatchCenter dispatchCenter;

    public Agent() {
    }

    public Agent(AgentType type, AgentStatus status) {
        this.type = type;
        this.status = status;
    }


    /**
     * @return Long return the id
     */
    public Long getId() {
        return id;
    }

    /**
     * @return String return the type
     */
    public AgentType getType() {
        return type;
    }

    /**
     * @param type the type to set
     */
    public void setType(AgentType type) {
        this.type = type;
    }

    /**
     * @return String return the status
     */
    public AgentStatus getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(AgentStatus status) {
        this.status = status;
    }

    /*
    public EcoOrder getOrder() {
        return order;
    }

    public void setOrder(EcoOrder order) {
        this.order = order;
    }
     */

    public DispatchCenter getCenter() {
        return dispatchCenter;
    }

    public void setCenter(DispatchCenter dispatchCenter) {
        this.dispatchCenter = dispatchCenter;
    }

    @Override
    public String toString() {
        return "Agent{" +
                "id=" + id +
                ", type=" + type +
                ", status=" + status +
                ", center=" + dispatchCenter +
                '}';
    }
}
