import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dropdown-menu',
  imports: [NgbDropdownModule, NgFor, NgIf],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.css',
})
export class DropdownMenuComponent {
  @Input() options: { image: string; name: string }[] = [];
  @Input() form!: FormGroup;
  @Input() controlName!: string;

  selectedOption!: { image: string; name: string };

  selectOption(option: { image: string; name: string }) {
    this.selectedOption = option;
    this.form.get(this.controlName)?.setValue(option.name);
  }
}
