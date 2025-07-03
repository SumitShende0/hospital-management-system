import { HttpClient } from '@angular/common/http';
import { NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
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
import { AdminService } from '../../services/admin.service';

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
  appointmentScheduleForm!: FormGroup;
  @Output() onAppointmentScheduled = new EventEmitter<void>();
  constructor(
    private modalService: NgbModal,
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) {}

  initializeForm() {
    this.appointmentScheduleForm = new FormGroup({
      doctor: new FormControl(
        this.selectedAppointment?.doctor || '',
        Validators.required
      ),
      reasonForAppointment: new FormControl(
        this.selectedAppointment.reasonForAppointment,
        Validators.required
      ),
      expectedAppointmentDate: new FormControl(
        this.selectedAppointment.expectedAppointmentDate,
        Validators.required
      ),
    });
  }
  selectedAppointment: any;

  @Input() set appointment(data: any) {
    if (data) {
      this.selectedAppointment = data;
      this.initializeForm();
      this.cdr.detectChanges();
      if (this.modalContent) {
        this.open();
      } else {
        console.error('modalContent not found');
      }
    }
  }
  open() {
    this.modalRef = this.modalService.open(this.modalContent, {
      backdrop: 'static',
      windowClass: 'dark-modal',
    });
  }

  onSubmit() {
    console.log(this.appointmentScheduleForm.value);
    this.isLoading = true;
    this.adminService
      .scheduleAppointment(
        this.appointmentScheduleForm.value,
        this.selectedAppointment.appointmentId
      )
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (this.modalRef) {
            this.modalRef.close();
          }
          this.onAppointmentScheduled.emit();
        },

        error: (error) => {
          this.isLoading = false;
          this.submitError = error.error.message;
        },
      });
  }
}
