package com.eco.delivery.repository;

import com.eco.delivery.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

    @Query("SELECT a FROM Account a where a.email =?1") //check if the email exists
    Optional<Account> findAccountByEmail(String email);


}

