package com.eco.delivery.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.Set;

@Entity(name = "Account")
@Table(name = "account")
public class Account {

    private static final Integer INITIAL_CREDITS = 300;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private Integer id;

    @Column(unique = true)
    @NonNull
    private String email;

    @NonNull
    @JsonProperty(value = "password")
    private String password;

    @NonNull
    @Column(name = "first_name")
    private String firstName;

    @NonNull
    @Column(name = "last_name")
    private String lastName;

    @NonNull
    private String phone;

    @NonNull
    private String address;

    @NonNull
    private Integer zipcode;

    @NonNull
    private Integer credits;

    @OneToMany(
            mappedBy = "account",
            cascade = CascadeType.ALL,
            targetEntity = EcoOrder.class
    )
    @JsonIgnoreProperties("account")
    private Set<EcoOrder> ecoOrders;

    private String token;


    public Account() {
    }

    public Account(@NonNull String email,
                   @NonNull String password,
                   @NonNull String firstName,
                   @NonNull String lastName,
                   @NonNull String phone,
                   @NonNull String address,
                   @NonNull Integer zipcode,
                   @NonNull Integer credits) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.address = address;
        this.zipcode = zipcode;
        this.credits = credits;
    }

    public Account(@NonNull String email,
                   @NonNull String password,
                   @NonNull String firstName,
                   @NonNull String lastName,
                   @NonNull String phone,
                   @NonNull String address,
                   @NonNull Integer zipcode,
                   @NonNull Integer credits,
                   String token) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.address = address;
        this.zipcode = zipcode;
        this.credits = credits;
        this.token = token;
    }

    public Integer getId() {
        return id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getZipcode() {
        return zipcode;
    }

    public void setZipcode(Integer zipcode) {
        this.zipcode = zipcode;
    }

    public Integer getCredits() {
        return credits;
    }

    public void setCredits(Integer credits) {
        this.credits = credits;
    }

    public Set<EcoOrder> getEcoOrders() {
        return ecoOrders;
    }

    public void setEcoOrders(Set<EcoOrder> ecoOrders) {
        this.ecoOrders = ecoOrders;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                ", zipcode=" + zipcode +
                ", credits=" + credits +
                ", ecoOrders=" + ecoOrders +
                ", token='" + token + '\'' +
                '}';
    }
}

