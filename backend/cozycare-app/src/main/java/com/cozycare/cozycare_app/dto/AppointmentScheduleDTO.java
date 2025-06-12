package com.cozycare.cozycare_app.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AppointmentScheduleDTO {

    @NotNull(message = "doctor is required")
    private String doctor;

    @NotNull(message = "Reason of Appointment is required")
    private String reasonForAppointment;

    @NotNull(message = "Appointment date is required")
    @Future(message = "Appointment date must be in the future")
    private LocalDateTime expectedAppointmentDate;
}
