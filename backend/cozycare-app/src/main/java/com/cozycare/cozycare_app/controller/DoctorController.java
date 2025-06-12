package com.cozycare.cozycare_app.controller;


import com.cozycare.cozycare_app.entity.Doctor;
import com.cozycare.cozycare_app.service.DoctorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;


    @PostMapping("doctor")
    public ResponseEntity<String> registerDoctor(@Valid @RequestBody Doctor doctor){
        doctorService.registerDoctor(doctor);
        return ResponseEntity.status(HttpStatus.CREATED).body("Doctor created");
    }

    @GetMapping("doctors")
    private ResponseEntity<List<Doctor>> getDoctors(){
        List<Doctor> doctors = doctorService.getDoctors();
        return Optional.of(doctors)
                .filter(list -> !list.isEmpty())
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }
}
