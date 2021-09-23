package com.eco.delivery.model;

import org.springframework.lang.NonNull;

import javax.persistence.*;

@Entity
@Table(name = "item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Long id;

    @NonNull
    private Integer weight;

    @NonNull
    @Column(name = "is_fragile")
    private Boolean isFragile;

    @NonNull
    private String type;

    @NonNull
    private Integer amount;

    public Item() {
    }

    public Item(@NonNull Integer weight, @NonNull Boolean isFragile,
                @NonNull String type, @NonNull Integer amount) {
        this.weight = weight;
        this.isFragile = isFragile;
        this.type = type;
        this.amount = amount;
    }

    public Long getId() {
        return id;
    }

    @NonNull
    public Integer getWeight() {
        return weight;
    }

    public void setWeight(@NonNull Integer weight) {
        this.weight = weight;
    }

    @NonNull
    public Boolean getIsFragile() {
        return isFragile;
    }

    public void setIsFragile(@NonNull Boolean fragileOrNot) {
        this.isFragile = fragileOrNot;
    }

    @NonNull
    public String getType() {
        return type;
    }

    public void setType(@NonNull String type) {
        this.type = type;
    }

    @NonNull
    public Integer getAmount() {
        return amount;
    }

    public void setAmount(@NonNull Integer amount) {
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "Item{" +
                "id='" + id + '\'' +
                ", weight=" + weight +
                ", fragileOrNot=" + isFragile +
                ", type='" + type + '\'' +
                ", amount=" + amount +
                '}';
    }
}
