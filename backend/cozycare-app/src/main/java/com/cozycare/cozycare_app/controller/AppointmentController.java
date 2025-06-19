package com.cozycare.cozycare_app.controller;

import com.cozycare.cozycare_app.dto.AppointmentCancelDTO;
import com.cozycare.cozycare_app.dto.AppointmentResponseDTO;
import com.cozycare.cozycare_app.dto.AppointmentScheduleDTO;
import com.cozycare.cozycare_app.dto.RegisterAppointmentDTO;
import com.cozycare.cozycare_app.model.AppointmentStatus;
import com.cozycare.cozycare_app.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PreAuthorize("hasRole('PATIENT')")
    @PostMapping("appointment")
    public ResponseEntity<String> registerAppointment(@Valid @RequestBody RegisterAppointmentDTO registerAppointment) {
        appointmentService.registerAppointment(registerAppointment);
        return ResponseEntity.status(HttpStatus.CREATED).body("Appointment Created Successfully");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("appointments")
    public ResponseEntity<Page<AppointmentResponseDTO>> getAppointments(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size, @RequestParam(defaultValue = "expectedAppointmentDate") String sortBy, @RequestParam(defaultValue = "desc") String direction, @RequestParam(required = false) AppointmentStatus status) {
        Sort sort = direction.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<AppointmentResponseDTO> appointmentDTOS = appointmentService.getAppointments(pageable, status);

        if (appointmentDTOS.hasContent()) {
            return ResponseEntity.ok(appointmentDTOS);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("appointment/{patientId}/schedule")
    public ResponseEntity<String> scheduleAppointment(@PathVariable UUID patientId, @Valid @RequestBody AppointmentScheduleDTO appointmentSchedule) {
        appointmentService.scheduleAppointment(patientId, appointmentSchedule);
        return ResponseEntity.status(HttpStatus.CREATED).body("Appointment is scheduled");

    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("appointment/{patientId}/cancel")
    public ResponseEntity<String> cancelAppointment(@PathVariable UUID patientId, @Valid @RequestBody AppointmentCancelDTO appointmentCancel) {
        appointmentService.cancelAppointment(patientId, appointmentCancel);
        return ResponseEntity.status(HttpStatus.CREATED).body("Appointment is cancelled");
    }
}
