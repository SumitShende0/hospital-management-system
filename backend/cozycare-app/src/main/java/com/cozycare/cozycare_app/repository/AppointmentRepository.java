package com.cozycare.cozycare_app.repository;

import com.cozycare.cozycare_app.entity.Appointment;
import com.cozycare.cozycare_app.model.AppointmentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {

    Page<Appointment> findByAppointmentStatus(Pageable pageable, AppointmentStatus appointmentBooked);

    Optional<List<Appointment>> findByAppointmentStatusAndExpectedAppointmentDateBefore(AppointmentStatus status, LocalDateTime dateTime);

    long countByAppointmentStatus(AppointmentStatus appointmentStatus);
}
