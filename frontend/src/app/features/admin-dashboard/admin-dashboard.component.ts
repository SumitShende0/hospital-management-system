import { AppointmentCancelComponent } from './../appointment-cancel/appointment-cancel.component';
import { allAppointments, Doctors } from './../../model';
import { DatePipe, NgFor, NgStyle } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentScheduleComponent } from '../appointment-schedule/appointment-schedule.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    NgFor,
    DatePipe,
    NgbModule,
    AppointmentScheduleComponent,
    AppointmentCancelComponent,
    RouterLink
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  currentPage = 1;
  pageSize = 5;
  collectionSize = 0;
  Math = Math;
  @ViewChild(AppointmentScheduleComponent)
  appointmentScheduleComponent!: AppointmentScheduleComponent;
  @ViewChild(AppointmentCancelComponent)
  appointmentCancelComponent!: AppointmentCancelComponent;

  openAppointmentScheduleComponent() {
    this.appointmentScheduleComponent.open();
  }

  openAppointmentCancelComponent() {
    this.appointmentCancelComponent.open();
  }
  displayedAppointments: any = [];
  doctors: { image: string; name: string }[] = Doctors;

  appointments: any = allAppointments;

  constructor() {
    this.collectionSize = this.appointments.length;
    this.refreshAppointments();
  }

  getDoctorProfile(name: string): string {
    const doctor = this.doctors.find((doc) => doc.name === name);
    return doctor ? doctor.image : '';
  }

  refreshAppointments() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedAppointments = this.appointments.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.refreshAppointments();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Confirmed':
        return 'badge bg-success';
      case 'Pending':
        return 'badge bg-primary';
      case 'Cancelled':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  }

  getStatusLogo(status: string): string {
    switch (status) {
      case 'Confirmed':
        return 'assets/icons/check.svg';
      case 'Pending':
        return 'assets/icons/pending.svg';
      case 'Cancelled':
        return 'assets/icons/close.svg';
      default:
        return 'badge bg-secondary';
    }
  }

  getIconFilter(status: string): string {
    switch (status) {
      case 'Confirmed':
        // green
        return 'invert(45%) sepia(95%) saturate(500%) hue-rotate(90deg) brightness(85%) contrast(85%)';
      case 'Pending':
        // blue
        return 'invert(33%) sepia(92%) saturate(4100%) hue-rotate(180deg) brightness(90%) contrast(90%)';
      case 'Cancelled':
        // red
        return 'invert(16%) sepia(100%) saturate(7500%) hue-rotate(345deg) brightness(90%) contrast(110%)';
      default:
        return 'none';
    }
  }
}
