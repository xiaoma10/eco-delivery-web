package com.eco.delivery.util;

public enum AgentType {
    DRONE(2, 25, 50),
    ROBOT(1, 100, 20);

    private int price; // USD/(mile * pound)
    private int load; // pound
    private int velocity; // miles/hour

    AgentType(int price, int load, int velocity) {
        this.price = price;
        this.load = load;
        this.velocity = velocity;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getLoad() {
        return load;
    }

    public void setLoad(int load) {
        this.load = load;
    }

    public int getVelocity() {
        return velocity;
    }

    public void setVelocity(int velocity) {
        this.velocity = velocity;
    }
}
