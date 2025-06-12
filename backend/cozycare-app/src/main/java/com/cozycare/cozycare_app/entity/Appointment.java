package com.cozycare.cozycare_app.entity;


import com.cozycare.cozycare_app.annotation.ValidatePhysicianName;
import com.cozycare.cozycare_app.model.AppointmentStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String doctor;

    private String reasonForAppointment;

    private String additionalComments;

    private LocalDateTime expectedAppointmentDate;

//    @NotBlank(message = "Reason for cancellation is required")
    private String reasonForCancellation;

//    @NotNull(message = "Appointment booking status is required")
    @Enumerated(EnumType.STRING)
    private AppointmentStatus appointmentStatus;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id",nullable = false)
//    @NotNull(message = "Patient Id is required")
    private Patient patientId;


    @PrePersist
    public void setDefaultStatus() {
        if (this.appointmentStatus == null) {
            this.appointmentStatus = AppointmentStatus.valueOf("PENDING");
        }
    }
}
