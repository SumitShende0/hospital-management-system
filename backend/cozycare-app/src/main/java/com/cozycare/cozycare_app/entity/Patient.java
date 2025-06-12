package com.cozycare.cozycare_app.entity;

import com.cozycare.cozycare_app.model.Gender;
import com.cozycare.cozycare_app.model.IdentificationType;
import com.cozycare.cozycare_app.model.PhoneInput;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import jakarta.persistence.Entity;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Data
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String fullName;
    private String email;
    private String phoneCountryCode;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private String gender;
    private String address;
    private String occupation;
    private String emergencyCountryCode;
    private String emergencyPhoneNumber;
    private String primaryCarePhysician;
    private String insuranceProvider;
    private String insurancePolicyNumber;
    private String allergies;
    private String currentMedication;
    private String familyMedicalHistory;
    private String pastMedicalHistory;
    private IdentificationType identificationType;
    private String identificationNumber;
    private String identificationDocumentID;
    private Boolean consentToTreatment;
    private Boolean consentToHealthInfoDisclosure;
    private Boolean privacyPolicyAgreement;
}
