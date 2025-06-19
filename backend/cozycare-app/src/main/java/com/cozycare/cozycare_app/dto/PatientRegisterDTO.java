package com.cozycare.cozycare_app.dto;

import com.cozycare.cozycare_app.annotation.ValidatePhysicianName;
import com.cozycare.cozycare_app.model.Gender;
import com.cozycare.cozycare_app.model.IdentificationType;
import com.cozycare.cozycare_app.model.PhoneInput;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PatientRegisterDTO {

    @NotBlank(message = "Full Name is required")
    private String fullName;
    @Email(message = "Invalid Email format")
    private String email;
    @NotNull(message = "Phone number is required")
    private PhoneInput phoneNumber;

    @NotNull(message = "Date of birth is required")
    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Gender is required")
    private Gender gender;
    private String address;
    private String occupation;
    private PhoneInput emergencyPhoneNumber;

    @ValidatePhysicianName
    private String primaryCarePhysician;
    private String insuranceProvider;
    private String insurancePolicyNumber;
    private String allergies;
    private String currentMedication;
    private String familyMedicalHistory;
    private String pastMedicalHistory;

    @NotNull(message = "Password is required")
    private String password;


    @Enumerated(EnumType.STRING)
    @NotNull(message = "Identification is required")
    private IdentificationType identificationType;
    private String identificationNumber;
    private String identificationDocumentID;

    @AssertTrue(message = "Consent to treatment is required")
    private Boolean consentToTreatment;

    @AssertTrue(message = "Consent to health info disclosure is required")
    private Boolean consentToHealthInfoDisclosure;

    @AssertTrue(message = "Privacy policy agreement is required")
    private Boolean privacyPolicyAgreement;
}
