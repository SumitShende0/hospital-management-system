import { NgClass, NgIf } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';
import { Doctors } from '../../model';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-appointment-schedule',
  imports: [
    NgClass,
    ReactiveFormsModule,
    NgIf,
    DropdownMenuComponent,
    ButtonComponent,
  ],
  templateUrl: './appointment-schedule.component.html',
  styleUrl: './appointment-schedule.component.css',
})
export class AppointmentScheduleComponent {
  @ViewChild('scheduleAppointmentForm') modalContent!: TemplateRef<any>;
  physiciansList: {
    image: string;
    name: string;
  }[] = Doctors;
  isLoading: boolean = false;
  modalRef: any;
  submitError: string = '';
  appointmentScheduleForm: FormGroup = new FormGroup({
    doctor: new FormControl('Leila Cameron', Validators.required),
    reasonForAppointment: new FormControl('', Validators.required),
    expectedAppointmentDate: new FormControl('', Validators.required),
  });

  constructor(private modalService: NgbModal) {}

  open() {
    this.modalRef = this.modalService.open(this.modalContent, {
      backdrop: 'static',
      windowClass: 'dark-modal',
    });
  }

  onSubmit() {
    console.log(this.appointmentScheduleForm.value);
    if (this.modalRef) {
      this.modalRef.close();
    }
  }
}
