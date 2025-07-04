import { DropdownMenuComponent } from './../dropdown-menu/dropdown-menu.component';
import { Component } from '@angular/core';
import { CountryISO, NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { Doctors, Gender, IdentificationTypes } from '../../model';
import { FileInputComponent } from '../file-input/file-input.component';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-patient-form',
  imports: [
    NgxIntlTelInputModule,
    FileInputComponent,
    ReactiveFormsModule,
    ButtonComponent,
    DropdownMenuComponent,
    NgClass,
  ],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.css',
})
export class PatientFormComponent {
  CountryISO = CountryISO;
  identificationTypes: string[] = IdentificationTypes;
  isLoading = false;
  physiciansList = Doctors;
  errorMessage: string = '';
  emailInputValue: string = '';
  emailError = '';
  patientForm: FormGroup = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    address: new FormControl(''),
    occupation: new FormControl(''),
    emergencyPhoneNumber: new FormControl(''),
    primaryCarePhysician: new FormControl('', Validators.required),
    insuranceProvider: new FormControl(''),
    insurancePolicyNumber: new FormControl(''),
    allergies: new FormControl(''),
    currentMedication: new FormControl(''),
    familyMedicalHistory: new FormControl(''),
    pastMedicalHistory: new FormControl(''),
    identificationType: new FormControl('', Validators.required),
    identificationNumber: new FormControl('', Validators.required),
    identificationDocumentID: new FormControl('', Validators.required),
    consentToTreatment: new FormControl(false, Validators.requiredTrue),
    password: new FormControl('', Validators.required),
    consentToHealthInfoDisclosure: new FormControl(
      false,
      Validators.requiredTrue
    ),
    privacyPolicyAgreement: new FormControl(false, Validators.requiredTrue),
  });

  isPasswordVisible = false;

  ngOnInit(){
    this.patientForm
      .get('email')
      ?.valueChanges.pipe(
        debounceTime(500), // wait 500ms after user stops typing
        distinctUntilChanged() // only call if value is different from last
      )
      .subscribe((email: string) => {
        this.emailAvailability(email);
      });
  }
  togglePassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  constructor(private patientService: PatientService, private router: Router) {}

  genderOptions: Gender[] = Object.values(Gender);

  emailAvailability(email: string) {
    console.log(email);

    if (!email) return;
    
    this.patientService.checkEmailAvailability(email).subscribe((response) => {
      if (response.available) {
        this.emailError = 'Email Already Register';
      } else {
        this.emailError = '';
      }
    });
  }

  onSubmit() {
    this.isLoading = true;
    console.log('Form submitted:', this.patientForm.value);
    localStorage.removeItem('access_token');
    this.patientService.registerPatient(this.patientForm.value).subscribe({
      next: (response) => {
        console.log('Patient Created Successfully', response);
        localStorage.setItem('access_token', (response as any).token);
        this.isLoading = false;
        this.router.navigate(['appointment-form']);
      },

      error: (error) => {
        console.log(error);
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Something Went Wrong!!';
      },
    });
  }
}
