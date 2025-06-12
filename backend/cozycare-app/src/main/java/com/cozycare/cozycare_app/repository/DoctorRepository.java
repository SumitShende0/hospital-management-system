package com.cozycare.cozycare_app.repository;

import com.cozycare.cozycare_app.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, UUID> {
    boolean existsByName(String trim);
}
