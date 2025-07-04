import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() isLoading: boolean = false;
  @Input() invalid: boolean | undefined = true;
  @Input({ required: false }) cssStyle: string = 'btn-success';

  get computedClasses(): string[] {
    const baseClasses = ['btn', 'mt-3'];
    if (this.cssStyle) {
      return [...baseClasses, ...this.cssStyle.split(' ')];
    }
    return baseClasses;
  }
}
