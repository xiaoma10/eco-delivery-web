package com.eco.delivery.repository;

import com.eco.delivery.model.EcoOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EcoOrderRepository extends JpaRepository<EcoOrder, UUID> {

    @Query("SELECT a FROM EcoOrder a WHERE a.account.id = ?1")
    Optional<List<EcoOrder>> findOrderByUserId(Integer id);


    @Query("SELECT a FROM EcoOrder a where a.orderNumber = ?1")
    Optional<EcoOrder> getOrderDetailByOrderId(UUID id);
}
