import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
@Component({
  selector: 'app-file-input',
  imports: [],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.css',
})
export class FileInputComponent {
  // @Output() fileId = new EventEmitter<string>();
  @Input() form!: FormGroup;
  @Input() controlName!: string;

  constructor(private patientService: PatientService) {}

  onFileSelected($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // console.log('Selected file:', file);
      // You can add further processing of the file here
      //call service for uploading image

      this.patientService.uploadImage(file).subscribe({
        next: (response) =>{

          console.log("Successfully " + response);
          
          this.form.get(this.controlName)?.setValue(response);
        }
      })
      
    } else {
      console.log('No file selected');
    }
  }
}
