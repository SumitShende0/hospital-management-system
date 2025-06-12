package com.cozycare.cozycare_app.controller;


import com.cozycare.cozycare_app.dto.PatientRegisterDTO;
import com.cozycare.cozycare_app.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @PostMapping("patient")
    public ResponseEntity<String> registerPatient(@Valid @RequestBody PatientRegisterDTO patient){

        patientService.registerPatient(patient);
        return ResponseEntity.status(HttpStatus.CREATED).body("Patient registered successfully");

    }

}
