import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Doctors } from '../../model';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';
import { AppointmentService } from '../../services/appointment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-form',
  imports: [ButtonComponent, ReactiveFormsModule, NgIf, DropdownMenuComponent],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css',
})
export class AppointmentFormComponent {
  isLoading: boolean = false;
  physiciansList = Doctors;
  errorMessage: string = '';
  appointmentForm: FormGroup = new FormGroup({
    doctor: new FormControl('', Validators.required),
    reasonForAppointment: new FormControl('', Validators.required),
    additionalComments: new FormControl(''),
    expectedAppointmentDate: new FormControl('', Validators.required),
  });

  constructor(
    private appointmentService: AppointmentService,
    private router: Router
  ) {}

  onSubmit() {
    console.log(this.appointmentForm.value);
    this.isLoading = true;
    this.appointmentService
      .addAppointment(this.appointmentForm.value)
      .subscribe({
        next: (response) => {
          console.log('Appointment successfully registered: ', response);
          this.isLoading = false;
          sessionStorage.setItem(
            'successData',
            JSON.stringify({
              date: this.appointmentForm.get('expectedAppointmentDate')?.value,
              doctor: this.appointmentForm.get('doctor')?.value,
            })
          );

          this.router.navigate(['success-page']);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Something Went Wrong!!';
          console.log('Appointment registration failed: ', error);
          this.isLoading = false;
        },
      });
  }
}
