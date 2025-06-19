package com.cozycare.cozycare_app.entity;

import com.cozycare.cozycare_app.model.IdentificationType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

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

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "userId")
    @JsonIgnoreProperties({"userPassword"})
    private User user;
}
