export interface LoginForm {
  fullName: string;
  email: string;
  phoneNumber: string;
}

export const IdentificationTypes = [
  'Birth Certificate',
  "Driver's License",
  'Medical Insurance Card/Policy',
  'Military ID Card',
  'National Identity Card',
  'Passport',
  'Resident Alien Card (Green Card)',
  'Social Security Card',
  'State ID Card',
  'Student ID Card',
  'Voter ID Card',
];

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}
