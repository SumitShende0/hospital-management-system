package com.cozycare.cozycare_app.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class AppointmentResponseDTO {

    private UUID appointmentId;
    private String patientName;
    private LocalDateTime expectedAppointmentDate;
    private String status;
    private String doctor;
    private String reasonForAppointment;
    private String reasonForCancellation;
    private String identificationDocumentId;
}
