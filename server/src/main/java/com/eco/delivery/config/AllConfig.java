package com.eco.delivery.config;

import com.eco.delivery.model.*;
import com.eco.delivery.repository.*;
import com.eco.delivery.util.AgentStatus;
import com.eco.delivery.util.AgentType;
import com.eco.delivery.util.CenterID;
import com.eco.delivery.util.OrderStatus;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Configuration
public class AllConfig {

    @Bean
    CommandLineRunner orderRunner(EcoOrderRepository ecoOrderRepository,
                                  DispatchCenterRepository dispatchCenterRepository) {
        return args -> {

            //sender
            Sender sender1= new Sender(
                    "Tom",
                    "Cruise",
                    "1111 S Chicago Ave",
                    "111-222-3333",
                    "tc@gmail.com");

            Sender sender2= new Sender(
                    "Angelina",
                    "Jolie",
                    "9999 N NYC Dr",
                    "999-888-7777",
                    "aj@gmail.com");

            //recipient
            Recipient recipient1= new Recipient(
                    "Chris",
                    "Pratt",
                    "2222 S Indiana Ave",
                    "222-333-4444",
                    "cp@gmail.com");

            Recipient recipient2= new Recipient("Natasha",
                    "Poly",
                    "5555 S Wisconsin St",
                    "333-444-5555",
                    "np@gmail.com");

            //centers
            DispatchCenter dispatchCenter_1 = new DispatchCenter(
                    CenterID.CENTER_0,
                    "1802 Balboa St, San Francisco, CA 94121",
                    10,
                    20,
                    10,
                    20,
                    37.776760,
                    -122.478300);
            DispatchCenter dispatchCenter_2 = new DispatchCenter(
                    CenterID.CENTER_1,
                    "4705 3rd St, San Francisco, CA 94124",
                    10,
                    20,
                    10,
                    20,
                    37.735130,
                    -122.390442);

            DispatchCenter dispatchCenter_3 = new DispatchCenter(
                    CenterID.CENTER_2,
                    "302 Randolph St, San Francisco, CA 94132",
                    10,
                    20,
                    10,
                    20,
                    37.714320,
                    -122.465330);


            //item
            Item item1 = new Item(10, true, "bottle", 1);
            Item item2 = new Item(1, false, "document", 5);

            //account
            Account account1 = new Account(
                    "az@gmail.com",
                    "123",
                    "alan",
                    "zhu",
                    "212-111-1111",
                    "San Francisco",
                    60600,
                    300,
                    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhekBnbWFpbC5jb20iLCJleHAiOjE2MjMyMzg2MzIsImlhdCI6MTYyMzIyMDYzMn0.JdXqDCsQiWEFD5WYDW9efIwNlSbkKOKSkL0jdXxV5po9W3p5jDTGlZO-dvOY0uLIj3wo41-6wE6ZvOtkIm-b7w"
            );

            //order
            EcoOrder ecoOrder = new EcoOrder(
                    "11 St", 41.868410, -87.624628,
                    "22 St", 41.924759, -87.655656,
                    OrderStatus.PLACED,
                    LocalDateTime.parse("2021-06-01T10:00:00"),
                    LocalDateTime.parse("2021-06-01T10:10:00"),
                    LocalDateTime.parse("2021-06-01T10:30:00"),
                    12.99,
                    CenterID.CENTER_1,
                    AgentType.ROBOT,
                    sender1,
                    recipient1,
                    item1,
                    account1,
                    false);



            ecoOrderRepository.save(ecoOrder);
            dispatchCenterRepository.saveAll(Arrays.asList(dispatchCenter_1, dispatchCenter_2, dispatchCenter_3));
        };
    }

}