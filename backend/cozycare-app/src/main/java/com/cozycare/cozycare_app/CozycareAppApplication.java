package com.cozycare.cozycare_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class CozycareAppApplication {
    public static void main(String[] args) {
        SpringApplication.run(CozycareAppApplication.class, args);
        System.out.println("System is started");
    }
}