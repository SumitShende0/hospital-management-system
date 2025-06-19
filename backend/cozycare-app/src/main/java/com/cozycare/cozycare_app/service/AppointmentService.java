package com.cozycare.cozycare_app.service;

import com.cozycare.cozycare_app.dto.AppointmentCancelDTO;
import com.cozycare.cozycare_app.dto.AppointmentResponseDTO;
import com.cozycare.cozycare_app.dto.AppointmentScheduleDTO;
import com.cozycare.cozycare_app.dto.RegisterAppointmentDTO;
import com.cozycare.cozycare_app.entity.Appointment;
import com.cozycare.cozycare_app.exception.InvalidAppointmentDateException;
import com.cozycare.cozycare_app.exception.InvalidAppointmentStateException;
import com.cozycare.cozycare_app.exception.ResourceNotFoundException;
import com.cozycare.cozycare_app.model.AppointmentStatus;
import com.cozycare.cozycare_app.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Appointment registerAppointment(RegisterAppointmentDTO registerAppointment) {
        Appointment newAppointment = new Appointment();

        newAppointment.setDoctor(registerAppointment.getDoctor());
        newAppointment.setReasonForAppointment(registerAppointment.getReasonForAppointment());
        newAppointment.setAdditionalComments(registerAppointment.getAdditionalComments());
        newAppointment.setExpectedAppointmentDate(registerAppointment.getExpectedAppointmentDate());
        newAppointment.setPatientId(registerAppointment.getPatientId());

        return appointmentRepository.save(newAppointment);
    }

    public Page<AppointmentResponseDTO> getAppointments(Pageable pageable, AppointmentStatus status) {
        Page<Appointment> appointmentPage;

        if (status == AppointmentStatus.SCHEDULED) {
            appointmentPage = appointmentRepository.findByAppointmentStatus(pageable, status);
        } else if (status == AppointmentStatus.PENDING){
            appointmentPage = appointmentRepository.findByAppointmentStatus(pageable, status);
        } else if (status == AppointmentStatus.CANCEL ) {
            appointmentPage = appointmentRepository.findByAppointmentStatus(pageable, status);
        }else {
            appointmentPage = appointmentRepository.findAll(pageable);
        }


        return appointmentPage.map(appointment -> {
            AppointmentResponseDTO dto = new AppointmentResponseDTO();
            dto.setAppointmentId(appointment.getId());
            dto.setDoctor(appointment.getDoctor());
            dto.setStatus(appointment.getAppointmentStatus().toString());
            dto.setPatientName(appointment.getPatientId().getFullName());
            dto.setExpectedAppointmentDate(appointment.getExpectedAppointmentDate());
            return dto;
        });

    }

    public Appointment scheduleAppointment(UUID patientId, AppointmentScheduleDTO appointmentSchedule) {
        Appointment appointment = appointmentRepository.findById(patientId).orElseThrow(() -> new ResourceNotFoundException("Appointment not found with ID: " + patientId));

        if (appointment.getExpectedAppointmentDate().isBefore(LocalDateTime.now())) {
            throw new InvalidAppointmentDateException("Appointment Date is expired");
        }

        if (appointment.getAppointmentStatus().equals("CANCEL")){
            throw new InvalidAppointmentStateException("Appointment already cancelled");
        }

        appointment.setExpectedAppointmentDate(appointmentSchedule.getExpectedAppointmentDate());
        appointment.setAppointmentStatus(AppointmentStatus.SCHEDULED);
        appointment.setDoctor(appointmentSchedule.getDoctor());
        appointment.setReasonForAppointment(appointmentSchedule.getReasonForAppointment());

        return appointmentRepository.save(appointment);
    }

    public Appointment cancelAppointment(UUID patientId, AppointmentCancelDTO appointmentCancel) {
        Appointment appointment = appointmentRepository.findById(patientId).orElseThrow(() -> new ResourceNotFoundException("Appointment not found with ID: " + patientId));

        if (appointment.getAppointmentStatus().equals("CANCEL")){
            throw new InvalidAppointmentStateException("Appointment Already cancelled");
        }

        appointment.setReasonForCancellation(appointmentCancel.getReasonForCancellation());
        appointment.setAppointmentStatus(AppointmentStatus.CANCEL);

        return appointmentRepository.save(appointment);

    }
}