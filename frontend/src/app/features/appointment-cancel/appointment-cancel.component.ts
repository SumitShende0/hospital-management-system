import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { NgClass, NgIf } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-appointment-cancel',
  imports: [ButtonComponent, NgIf, ReactiveFormsModule, NgClass],
  templateUrl: './appointment-cancel.component.html',
  styleUrl: './appointment-cancel.component.css',
})
export class AppointmentCancelComponent {
  @ViewChild('scheduleAppointmentForm') modalContent!: TemplateRef<any>;
  isLoading: boolean = false;
  modalRef: any;

  submitError: string = '';
  appointmentCancelForm: FormGroup = new FormGroup({
    reasonForCancellation: new FormControl('', Validators.required),
  });

  constructor(private modalService: NgbModal) {}

  open() {
    this.modalRef = this.modalService.open(this.modalContent, {
      backdrop: 'static',
      windowClass: 'dark-modal',
    });
  }

  onSubmit() {
    console.log(this.appointmentCancelForm.value);
    if (this.modalRef) {
      this.modalRef.close();
    }
  }
}
