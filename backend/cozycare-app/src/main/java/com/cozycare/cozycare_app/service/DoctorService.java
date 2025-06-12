package com.cozycare.cozycare_app.service;


import com.cozycare.cozycare_app.entity.Doctor;
import com.cozycare.cozycare_app.repository.DoctorRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    public Doctor registerDoctor(@Valid Doctor doctor) {
        return  doctorRepository.save(doctor);
    }

    public List<Doctor> getDoctors() {
        return doctorRepository.findAll();
    }
}
