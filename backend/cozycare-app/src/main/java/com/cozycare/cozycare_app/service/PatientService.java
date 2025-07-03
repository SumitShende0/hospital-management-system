package com.cozycare.cozycare_app.service;


import com.cozycare.cozycare_app.dto.PatientRegisterDTO;
import com.cozycare.cozycare_app.entity.Patient;
import com.cozycare.cozycare_app.entity.User;
import com.cozycare.cozycare_app.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public Patient registerPatient(PatientRegisterDTO patientRegister, User user) {

        Patient patient = new Patient();
        patient.setFullName(patientRegister.getFullName());
        patient.setEmail(patientRegister.getEmail());

        patient.setPhoneCountryCode(patientRegister.getPhoneNumber().getCountryCode());
        patient.setPhoneNumber(patientRegister.getPhoneNumber().getNumber());
        patient.setEmergencyCountryCode(patientRegister.getEmergencyPhoneNumber() != null
                ? patientRegister.getEmergencyPhoneNumber().getCountryCode()
                : null);
        patient.setEmergencyPhoneNumber(patientRegister.getEmergencyPhoneNumber() != null
                ? patientRegister.getEmergencyPhoneNumber().getNumber()
                : null);

        patient.setDateOfBirth(patientRegister.getDateOfBirth());
        patient.setGender(patientRegister.getGender().toString());
        patient.setAddress(patientRegister.getAddress());
        patient.setOccupation(patientRegister.getOccupation());
        patient.setPrimaryCarePhysician(patientRegister.getPrimaryCarePhysician());
        patient.setInsuranceProvider(patientRegister.getInsuranceProvider());
        patient.setInsurancePolicyNumber(patientRegister.getInsurancePolicyNumber());
        patient.setAllergies(patientRegister.getAllergies());
        patient.setCurrentMedication(patientRegister.getCurrentMedication());
        patient.setFamilyMedicalHistory(patientRegister.getFamilyMedicalHistory());
        patient.setPastMedicalHistory(patientRegister.getPastMedicalHistory());
        patient.setIdentificationType(patientRegister.getIdentificationType());
        patient.setIdentificationNumber(patientRegister.getIdentificationNumber());
        patient.setIdentificationDocumentID(patientRegister.getIdentificationDocumentID());
        patient.setConsentToTreatment(patientRegister.getConsentToTreatment());
        patient.setConsentToHealthInfoDisclosure(patientRegister.getConsentToHealthInfoDisclosure());
        patient.setPrivacyPolicyAgreement(patientRegister.getPrivacyPolicyAgreement());
        patient.setUser(user);
        return patientRepository.save(patient);
    }
}
