package com.cozycare.cozycare_app.dto;

import com.cozycare.cozycare_app.annotation.ValidatePhysicianName;
import com.cozycare.cozycare_app.entity.Patient;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class RegisterAppointmentDTO {

    @ValidatePhysicianName
    private String doctor;

    @NotBlank(message = "Reason for appointment is required")
    private String reasonForAppointment;

    private String additionalComments;

    @NotNull(message = "Appointment Date is required")
    @Future(message = "Appointment date must be in the future")
    private LocalDateTime expectedAppointmentDate;

    @NotNull(message = "Patient id is required")
    private Patient patientId;
}
