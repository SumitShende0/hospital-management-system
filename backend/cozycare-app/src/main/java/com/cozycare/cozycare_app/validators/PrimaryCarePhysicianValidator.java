package com.cozycare.cozycare_app.validators;

import com.cozycare.cozycare_app.annotation.ValidatePhysicianName;
import com.cozycare.cozycare_app.entity.Doctor;
import com.cozycare.cozycare_app.repository.DoctorRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PrimaryCarePhysicianValidator implements ConstraintValidator<ValidatePhysicianName, String> {

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public boolean isValid(String name, ConstraintValidatorContext constraintValidatorContext) {
        if (name == null || name.trim().isEmpty()) {
            return false;
        }
        return doctorRepository.existsByName(name.trim());
    }
}
