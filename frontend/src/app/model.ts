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

export const Doctors = [
  {
    image: '/assets/images/dr-green.png',
    name: 'John Green',
  },
  {
    image: '/assets/images/dr-cameron.png',
    name: 'Leila Cameron',
  },
  {
    image: '/assets/images/dr-livingston.png',
    name: 'David Livingston',
  },
  {
    image: '/assets/images/dr-peter.png',
    name: 'Evan Peter',
  },
  {
    image: '/assets/images/dr-powell.png',
    name: 'Jane Powell',
  },
  {
    image: '/assets/images/dr-remirez.png',
    name: 'Alex Ramirez',
  },
  {
    image: '/assets/images/dr-lee.png',
    name: 'Jasmine Lee',
  },
  {
    image: '/assets/images/dr-cruz.png',
    name: 'Alyana Cruz',
  },
  {
    image: '/assets/images/dr-sharma.png',
    name: 'Hardik Sharma',
  },
];
export const allAppointments = [
  {
    id: 1,
    patientName: 'John Doe',
    doctor: 'John Green',
    date: '2024-01-15',
    time: '10:00 AM',
    status: 'Confirmed',
  },
  {
    id: 2,
    patientName: 'Jane Smith',
    doctor: 'Leila Cameron',
    date: '2024-01-15',
    time: '11:00 AM',
    status: 'Pending',
  },
  {
    id: 3,
    patientName: 'Mike Wilson',
    doctor: 'David Livingston',
    date: '2024-01-15',
    time: '2:00 PM',
    status: 'Confirmed',
  },
  {
    id: 4,
    patientName: 'Sarah Davis',
    doctor: 'Jasmine Lee',
    date: '2024-01-16',
    time: '9:00 AM',
    status: 'Cancelled',
  },
  {
    id: 5,
    patientName: 'Tom Anderson',
    doctor: 'John Green',
    date: '2024-01-16',
    time: '10:30 AM',
    status: 'Confirmed',
  },
  {
    id: 6,
    patientName: 'Lisa Garcia',
    doctor: 'Leila Cameron',
    date: '2024-01-16',
    time: '1:00 PM',
    status: 'Pending',
  },
  {
    id: 7,
    patientName: 'David Miller',
    doctor: 'David Livingston',
    date: '2024-01-17',
    time: '11:00 AM',
    status: 'Confirmed',
  },
  {
    id: 8,
    patientName: 'Emma Taylor',
    doctor: 'Jasmine Lee',
    date: '2024-01-17',
    time: '3:00 PM',
    status: 'Confirmed',
  },
  {
    id: 9,
    patientName: 'Ryan Martinez',
    doctor: 'John Green',
    date: '2024-01-18',
    time: '9:30 AM',
    status: 'Pending',
  },
  {
    id: 10,
    patientName: 'Amy Johnson',
    doctor: 'Leila Cameron',
    date: '2024-01-18',
    time: '2:30 PM',
    status: 'Confirmed',
  },
  {
    id: 11,
    patientName: 'Chris Brown',
    doctor: 'David Livingston',
    date: '2024-01-19',
    time: '10:00 AM',
    status: 'Cancelled',
  },
  {
    id: 12,
    patientName: 'Jessica Wilson',
    doctor: 'Jasmine Lee',
    date: '2024-01-19',
    time: '4:00 PM',
    status: 'Confirmed',
  },
];
