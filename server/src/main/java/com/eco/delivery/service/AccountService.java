package com.eco.delivery.service;

import com.eco.delivery.model.Account;
import com.eco.delivery.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class AccountService {
    private final AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }


    public ResponseEntity<Account> setToken(Account account, String token) {
        Optional<Account> accountByEmail = accountRepository.findAccountByEmail(account.getEmail());
        if (!accountByEmail.isPresent()) {
            throw new IllegalStateException("Email " + account.getEmail() + " does not exist!");
        }
        account.setToken(token);
        accountRepository.save(account);
        return ResponseEntity.ok(account);
    }




    public List<Account> getAccounts() {
        return accountRepository.findAll();
    }

    public Account getAccountById(Integer id) {
        Account accountById = accountRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Account Id " + id + " does not exist")
                );
        return accountById;
    }

    public Account getAccountByEmail(String email) {
        Account accountByEmail = accountRepository.findAccountByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Email " + email + " does not exist")
                );
        return accountByEmail;
    }

    public Account findAccountByEmailJWT(Account account) {
        Optional<Account> accountByUsername = accountRepository.findAccountByEmail(account.getEmail());
        if (accountByUsername.isPresent()) {
            throw new IllegalStateException("Email " + account.getEmail() + " is already taken");
        }
        accountRepository.save(account);
        return account;
    }

    public void addNewAccount(Account account) {
        Optional<Account> accountByEmail = accountRepository.findAccountByEmail(account.getEmail());
        if (accountByEmail.isPresent()) {
            throw new IllegalStateException("Email " + account.getEmail() + " is already taken");
        }
        accountRepository.save(account);
    }

    //    @Transactional
    public void updateAccount(Integer accountId,
                              String password,
                              String firstName,
                              String lastName,
                              String phone,
                              String email,
                              String address,
                              Integer zipcode) throws IllegalStateException {
        //first check if accountId exists
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new IllegalStateException("Account Id " + accountId + " does not exist")
                );

        //when it comes here, it means that account exists
        //check if email provided is valid or the same as previous one
        if(email != null && email.length() > 0 && !Objects.equals(account.getEmail(), email)) {
            Optional<Account> accountOptional = accountRepository.findAccountByEmail(email);
            if (accountOptional.isPresent()) {
                throw new IllegalStateException("Email " + email + " is already taken");
            }
            account.setEmail(email);
        }

        //????? i need to create a enum and iterate each item with below method
        // check if first name provided is valid
        if (password != null && !password.isEmpty()) {
            account.setPassword(password);
        }

        if (firstName != null && !firstName.isEmpty()) {
            account.setFirstName(firstName);
        }

        if (lastName != null && !lastName.isEmpty()) {
            account.setLastName(lastName);
        }

        if (phone != null && !phone.isEmpty()) {
            account.setPhone(phone);
        }

        if (address != null && !address.isEmpty()) {
            account.setAddress(address);
        }

        // valid zipcode in the US 10000 ~ 99999
        if (zipcode != null && zipcode > 10000 && zipcode <= 99999) {
            account.setZipcode(zipcode);
        }



        accountRepository.save(account);
    }

}

