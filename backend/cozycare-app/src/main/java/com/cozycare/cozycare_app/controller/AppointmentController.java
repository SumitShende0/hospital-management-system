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

import java.security.Principal;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("api/")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PreAuthorize("hasRole('PATIENT')")
    @PostMapping("appointment")
    public ResponseEntity<Map<String, String>> registerAppointment(@Valid @RequestBody RegisterAppointmentDTO registerAppointment, Principal principal) {
        String userEmail = principal.getName();
        appointmentService.registerAppointment(registerAppointment, userEmail);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Appointment Created Successfully"));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("appointments")
    public ResponseEntity<Page<AppointmentResponseDTO>> getAppointments(@RequestParam(defaultValue = "0") int page,
                                                                        @RequestParam(defaultValue = "5") int size,
                                                                        @RequestParam(defaultValue = "expectedAppointmentDate") String sortBy,
                                                                        @RequestParam(defaultValue = "desc") String direction,
                                                                        @RequestParam(required = false) AppointmentStatus status) {
        Sort sort = direction.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<AppointmentResponseDTO> appointmentDTOS = appointmentService.getAppointments(pageable, status);


        return ResponseEntity.ok(appointmentDTOS);

    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("appointment/{appointmentId}/schedule")
    public ResponseEntity<Map<String, String>> scheduleAppointment(@PathVariable UUID appointmentId, @Valid @RequestBody AppointmentScheduleDTO appointmentSchedule) {
        appointmentService.scheduleAppointment(appointmentId, appointmentSchedule);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Appointment is scheduled"));

    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("appointment/{appointmentId}/cancel")
    public ResponseEntity<Map<String, String>> cancelAppointment(@PathVariable UUID appointmentId, @Valid @RequestBody AppointmentCancelDTO appointmentCancel) {
        appointmentService.cancelAppointment(appointmentId, appointmentCancel);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Appointment is Cancelled"));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("appointment/number-of-scheduled-appointment/{appointmentStatus}")
    public ResponseEntity<Map<String, Long>> totalNumberOfScheduledAppointment(@PathVariable String appointmentStatus) {
        Long count = appointmentService.countOfAppointmentByStatus(AppointmentStatus.valueOf(appointmentStatus.toUpperCase()));
        return ResponseEntity.status(HttpStatus.OK).body(Map.of("count", count));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("appointment/number-of-pending-appointment/{appointmentStatus}")
    public ResponseEntity<Map<String, Long>> totalNumberOfPendingAppointment(@PathVariable String appointmentStatus) {
        Long count = appointmentService.countOfAppointmentByStatus(AppointmentStatus.valueOf(appointmentStatus.toUpperCase()));
        return ResponseEntity.status(HttpStatus.OK).body(Map.of("count", count));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("appointment/number-of-cancel-appointment/{appointmentStatus}")
    public ResponseEntity<Map<String, Long>> totalNumberOfCancelAppointment(@PathVariable String appointmentStatus) {
        Long count = appointmentService.countOfAppointmentByStatus(AppointmentStatus.valueOf(appointmentStatus.toUpperCase()));
        return ResponseEntity.status(HttpStatus.OK).body(Map.of("count", count));
    }
}
