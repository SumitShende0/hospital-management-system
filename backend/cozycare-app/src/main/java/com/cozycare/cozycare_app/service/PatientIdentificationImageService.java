package com.cozycare.cozycare_app.service;

import com.cozycare.cozycare_app.entity.PatientIdentificationImage;
import com.cozycare.cozycare_app.repository.PatientIdentificationImageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class PatientIdentificationImageService {

    @Autowired
    private PatientIdentificationImageRepo patientIdentificationImageRepo;


    @Cacheable(value = "identificationImages", key = "#id", unless = "#result == null || #result == null")
    public Optional<PatientIdentificationImage> getImage(UUID id) {
        return patientIdentificationImageRepo.findById(id);
    }

    public UUID saveImage(PatientIdentificationImage image) {
        PatientIdentificationImage saveImage = patientIdentificationImageRepo.save(image);
        return saveImage.getId();
    }
}
