import { Component } from '@angular/core';
import { CountryISO, NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { Gender, IdentificationTypes } from '../../model';
import { FileInputComponent } from '../file-input/file-input.component';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-patient-form',
  imports: [
    NgxIntlTelInputModule,
    FileInputComponent,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: './patient-form.component.html',
  styleUrl: './patient-form.component.css',
})
export class PatientFormComponent {
  CountryISO = CountryISO;
  identificationTypes: string[] = IdentificationTypes;
  isLoading = false;

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
    consentToHealthInfoDisclosure: new FormControl(
      false,
      Validators.requiredTrue
    ),
    privacyPolicyAgreement: new FormControl(false, Validators.requiredTrue),
  });

  genderOptions: Gender[] = Object.values(Gender);

  onSubmit() {
    console.log('Form submitted:', this.patientForm.value);
  }
}
