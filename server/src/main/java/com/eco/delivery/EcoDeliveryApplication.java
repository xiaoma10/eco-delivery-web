package com.eco.delivery;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class EcoDeliveryApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcoDeliveryApplication.class, args);
	}

}
