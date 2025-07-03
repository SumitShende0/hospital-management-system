package com.cozycare.cozycare_app.service;

import com.cozycare.cozycare_app.dto.AppointmentCancelDTO;
import com.cozycare.cozycare_app.dto.AppointmentResponseDTO;
import com.cozycare.cozycare_app.dto.AppointmentScheduleDTO;
import com.cozycare.cozycare_app.dto.RegisterAppointmentDTO;
import com.cozycare.cozycare_app.entity.Appointment;
import com.cozycare.cozycare_app.entity.Patient;
import com.cozycare.cozycare_app.exception.InvalidAppointmentDateException;
import com.cozycare.cozycare_app.exception.InvalidAppointmentStateException;
import com.cozycare.cozycare_app.exception.ResourceNotFoundException;
import com.cozycare.cozycare_app.model.AppointmentStatus;
import com.cozycare.cozycare_app.repository.AppointmentRepository;
import com.cozycare.cozycare_app.repository.PatientRepository;
import com.cozycare.cozycare_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private UserRepository userRepository;

    public Appointment registerAppointment(RegisterAppointmentDTO registerAppointment, String userEmail) {
        Appointment newAppointment = new Appointment();

        Patient patient = patientRepository.findByUserUserEmail(userEmail)
                .orElseThrow(() -> new IllegalStateException("Patient is not available"));


        newAppointment.setDoctor(registerAppointment.getDoctor());
        newAppointment.setReasonForAppointment(registerAppointment.getReasonForAppointment());
        newAppointment.setAdditionalComments(registerAppointment.getAdditionalComments());
        newAppointment.setExpectedAppointmentDate(registerAppointment.getExpectedAppointmentDate());
        newAppointment.setPatient(patient);

        return appointmentRepository.save(newAppointment);
    }


    @Cacheable(value = "appointments", key = "#pageable.pageNumber + '-' + #pageable.pageSize + '-' + #status")
    public Page<AppointmentResponseDTO> getAppointments(Pageable pageable, AppointmentStatus status) {
        Page<Appointment> appointmentPage;

        if (status == AppointmentStatus.SCHEDULED) {
            appointmentPage = appointmentRepository.findByAppointmentStatus(pageable, status);
        } else if (status == AppointmentStatus.PENDING) {
            appointmentPage = appointmentRepository.findByAppointmentStatus(pageable, status);
        } else if (status == AppointmentStatus.CANCEL) {
            appointmentPage = appointmentRepository.findByAppointmentStatus(pageable, status);
        } else {
            appointmentPage = appointmentRepository.findAll(pageable);
        }


        return appointmentPage.map(appointment -> {
            AppointmentResponseDTO dto = new AppointmentResponseDTO();
            dto.setAppointmentId(appointment.getId());
            dto.setDoctor(appointment.getDoctor());
            dto.setStatus(appointment.getAppointmentStatus().toString());
            dto.setPatientName(appointment.getPatient().getFullName());
            dto.setExpectedAppointmentDate(appointment.getExpectedAppointmentDate());
            dto.setReasonForAppointment(appointment.getReasonForAppointment());
            dto.setReasonForCancellation(appointment.getReasonForCancellation());
            dto.setIdentificationDocumentId(appointment.getPatient().getIdentificationDocumentID());
            return dto;
        });

    }

    @CacheEvict(value = {"appointments", "appointmentCounts"}, allEntries = true)
    public Appointment scheduleAppointment(UUID appointmentId, AppointmentScheduleDTO appointmentSchedule) {
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(() -> new ResourceNotFoundException("Appointment not found with ID: " + appointmentId));

        if (appointment.getExpectedAppointmentDate().isBefore(LocalDateTime.now())) {
            throw new InvalidAppointmentDateException("Appointment Date is expired");
        }

        if (appointment.getAppointmentStatus() == AppointmentStatus.CANCEL) {
            throw new InvalidAppointmentStateException("Appointment already cancelled");
        }

        appointment.setExpectedAppointmentDate(appointmentSchedule.getExpectedAppointmentDate());
        appointment.setAppointmentStatus(AppointmentStatus.SCHEDULED);
        appointment.setDoctor(appointmentSchedule.getDoctor());
        appointment.setReasonForAppointment(appointmentSchedule.getReasonForAppointment());

        return appointmentRepository.save(appointment);
    }

    @CacheEvict(value = {"appointments", "appointmentCounts"}, allEntries = true)
    public Appointment cancelAppointment(UUID appointmentId, AppointmentCancelDTO appointmentCancel) {
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow(() -> new ResourceNotFoundException("Appointment not found with ID: " + appointmentId));

        if (appointment.getAppointmentStatus() == AppointmentStatus.CANCEL) {
            throw new InvalidAppointmentStateException("Appointment Already cancelled");
        }

        appointment.setReasonForCancellation(appointmentCancel.getReasonForCancellation());
        appointment.setAppointmentStatus(AppointmentStatus.CANCEL);
        return appointmentRepository.save(appointment);

    }

    @Cacheable(value = "appointmentCounts", key = "#appointmentStatus")
    public long countOfAppointmentByStatus(AppointmentStatus appointmentStatus) {
        return appointmentRepository.countByAppointmentStatus(appointmentStatus);
    }

    public void autoAppointmentCancel() {
        appointmentRepository.findByAppointmentStatus(AppointmentStatus.PENDING)
                .ifPresent(appointments -> {
                    appointments.forEach(appointment -> {
                        if (appointment.getExpectedAppointmentDate().isBefore(LocalDateTime.now())) {
                            appointment.setAppointmentStatus(AppointmentStatus.CANCEL);
                            appointment.setReasonForCancellation("Appointment Date Expired before any action");
                        }
                    });
                });
    }
}