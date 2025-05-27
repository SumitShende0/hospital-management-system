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
import { DropdownMenuComponent } from "../dropdown-menu/dropdown-menu.component";

@Component({
  selector: 'app-appointment-form',
  imports: [ButtonComponent, ReactiveFormsModule, NgIf, DropdownMenuComponent],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css',
})
export class AppointmentFormComponent {
  isLoading: boolean = false;
  physiciansList = Doctors;
  appointmentForm: FormGroup = new FormGroup({
    doctor: new FormControl('', Validators.required),
    reasonForAppointment: new FormControl('', Validators.required),
    additionalComments: new FormControl('', Validators.required),
    expectedAppointmentDate: new FormControl('', Validators.required),
  });

  onSubmit() {
    console.log(this.appointmentForm.value);
  }
}
