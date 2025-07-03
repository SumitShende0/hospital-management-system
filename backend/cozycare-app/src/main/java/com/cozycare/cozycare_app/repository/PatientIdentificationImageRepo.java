package com.cozycare.cozycare_app.repository;

import com.cozycare.cozycare_app.entity.PatientIdentificationImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PatientIdentificationImageRepo extends JpaRepository<PatientIdentificationImage, UUID> {
}
