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

  ngOnInit() {
    const selectedName = this.form.get(this.controlName)?.value;

    this.selectedOption =
      this.options.find((doc) => doc.name === selectedName) || this.options[0];
  }

  selectOption(option: { image: string; name: string }) {
    this.form.get(this.controlName)?.setValue(option.name);
  }
}
