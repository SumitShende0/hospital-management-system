import { AppointmentCancelComponent } from './../appointment-cancel/appointment-cancel.component';
import { allAppointments, Doctors } from './../../model';
import { DatePipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentScheduleComponent } from '../appointment-schedule/appointment-schedule.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    NgFor,
    NgIf,
    DatePipe,
    NgbModule,
    AppointmentScheduleComponent,
    AppointmentCancelComponent,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  currentPage = 1;
  pageSize = 5;
  collectionSize = 0;
  Math = Math;
  selectedStatus = 'ALL';
  selectedAppointment: any;
  @ViewChild(AppointmentScheduleComponent)
  appointmentScheduleComponent!: AppointmentScheduleComponent;
  @ViewChild(AppointmentCancelComponent)
  appointmentCancelComponent!: AppointmentCancelComponent;
  totalNumberOfScheduleAppointment: number = 0;
  totalNumberOfPendingAppointment: number = 0;
  totalNumberOfCancelAppointment: number = 0;
  selectedAction: 'schedule' | 'cancel' | null = null;
  openAppointmentScheduleComponent(appointment: any) {
    this.selectedAppointment = null;
    this.selectedAction = null;

    setTimeout(() => {
      this.selectedAppointment = appointment;
      this.selectedAction = 'schedule';
    });
  }

  openAppointmentCancelComponent(appointment: any) {
    this.selectedAppointment = null; // Reset first
    this.selectedAction = null;

    // Force refresh input by resetting first
    setTimeout(() => {
      this.selectedAppointment = appointment;
      this.selectedAction = 'cancel';
    });
  }
  displayedAppointments: any = [];
  doctors: { image: string; name: string }[] = Doctors;

  constructor(private adminService: AdminService) {
    // this.collectionSize = this.appointments.length;
    // this.refreshAppointments();
  }

  ngOnInit() {
    this.loadAppointments();
  }

  getDoctorProfile(name: string): string {
    const doctor = this.doctors.find((doc) => doc.name === name);
    return doctor ? doctor.image : '';
  }

  refreshAppointments() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.loadAppointments();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.refreshAppointments();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'SCHEDULED':
        return 'badge bg-success';
      case 'PENDING':
        return 'badge bg-primary';
      case 'CANCEL':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  }

  getStatusLogo(status: string): string {
    switch (status) {
      case 'SCHEDULED':
        return 'assets/icons/check.svg';
      case 'PENDING':
        return 'assets/icons/pending.svg';
      case 'CANCEL':
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
  loadAppointments(): void {
    console.log(this.selectedStatus);

    this.adminService
      .getAppointment(this.currentPage, this.pageSize, this.selectedStatus)
      .subscribe((response) => {
        console.log(response);

        this.displayedAppointments = response.content;
        this.collectionSize = response.totalElements;
      });

    this.getTotalNumberOfCancelAppointment();
    this.getTotalNumberOfPendingAppointment();
    this.getTotalNumberOfScheduledAppointment();
  }

  onStatusChange() {
    this.currentPage = 1;
    this.loadAppointments();
  }

  getTotalNumberOfCancelAppointment() {
    this.adminService
      .totalNumberOfCancelAppointment('CANCEL')
      .subscribe((response) => {
        this.totalNumberOfCancelAppointment = response.count;
        console.log('C' + this.totalNumberOfCancelAppointment);
      });
  }
  getTotalNumberOfScheduledAppointment() {
    this.adminService
      .totalNumberOfScheduledAppointment('SCHEDULED')
      .subscribe((response) => {
        this.totalNumberOfScheduleAppointment = response.count;
        console.log('s' + this.totalNumberOfScheduleAppointment);
      });
  }
  getTotalNumberOfPendingAppointment() {
    this.adminService
      .totalNumberOfPendingAppointment('PENDING')
      .subscribe((response) => {
        this.totalNumberOfPendingAppointment = response.count;
        console.log('P' + this.totalNumberOfPendingAppointment);

        this.totalNumberOfPendingAppointment;
      });
  }
}
