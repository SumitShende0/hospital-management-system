import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { NgClass, NgIf } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../services/admin.service';

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
  @Output() onAppointmentCancel = new EventEmitter<void>();
  submitError: string = '';
  appointmentCancelForm: FormGroup = new FormGroup({
    reasonForCancellation: new FormControl('', Validators.required),
  });
  selectedAppointment: any = '';
  constructor(
    private modalService: NgbModal,
    private adminService: AdminService
  ) {}

  @Input() set appointment(data: any) {
    if (data) {
      this.selectedAppointment = data;
      this.initializeForm();
      setTimeout(() => {
        if (this.modalContent) {
          this.open();
        } else {
          console.error('modalContent not found');
        }
      });
    }
  }

  initializeForm() {
    this.appointmentCancelForm = new FormGroup({
      reasonForCancellation: new FormControl(
        this.selectedAppointment.reasonForCancellation || '',
        Validators.required
      ),
    });
  }

  open() {
    this.modalRef = this.modalService.open(this.modalContent, {
      backdrop: 'static',
      windowClass: 'dark-modal',
    });
  }

  onSubmit() {
    console.log(this.appointmentCancelForm.value);
    this.isLoading = true;
    this.adminService
      .cancelAppointment(
        this.appointmentCancelForm.value,
        this.selectedAppointment.appointmentId
      )
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (this.modalRef) {
            this.modalRef.close();
          }
          this.onAppointmentCancel.emit();
        },

        error: (error) => {
          this.isLoading = false;
          this.submitError = error.error.message;
        },
      });
  }
}
