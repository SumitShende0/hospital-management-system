import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  onFileSelected($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // console.log('Selected file:', file);
      // You can add further processing of the file here
      //call service for uploading image
      this.form.get(this.controlName)?.setValue(file.lastModified);
    } else {
      console.log('No file selected');
    }
  }
}
