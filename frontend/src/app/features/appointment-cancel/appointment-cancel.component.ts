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
  disableInitially = false;
  constructor(
    private modalService: NgbModal,
    private adminService: AdminService
  ) {}


  @Input() set appointment(data: any) {
    if (data) {
      console.log('[Input Setter] appointment set:', data);
      this.selectedAppointment = data;
      this.initializeForm();
      setTimeout(() => {
        console.log('[setTimeout] modalContent:', this.modalContent);
        if (this.modalContent) {
          console.log('Incoming appointment:', data);
          this.open();
        } else {
          console.error('modalContent not found');
        }
      });
    } else {
      console.warn('⚠️ No data provided to @Input appointment');
    }
  }

  initializeForm() {

    const hasInitialReason =
      !!this.selectedAppointment.reasonForCancellation?.trim();

    this.disableInitially = hasInitialReason;

    this.appointmentCancelForm = new FormGroup({
      reasonForCancellation: new FormControl(
        this.selectedAppointment.reasonForCancellation || '',
        Validators.required
      ),
    });
    const control = this.appointmentCancelForm.get('reasonForCancellation');
    if (control?.value) {
      control.markAsTouched();
      control.markAsDirty();
    }
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
