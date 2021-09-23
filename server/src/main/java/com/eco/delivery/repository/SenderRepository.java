package com.eco.delivery.repository;

import com.eco.delivery.model.Sender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SenderRepository extends JpaRepository<Sender, Long> {
}
