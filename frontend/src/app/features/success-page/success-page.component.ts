import { CommonModule } from '@angular/common';
import { Component, Pipe } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Doctors } from '../../model';

@Component({
  selector: 'app-success-page',
  imports: [RouterLink, CommonModule],
  templateUrl: './success-page.component.html',
  styleUrl: './success-page.component.css',
})
export class SuccessPageComponent {
  date = '';
  doctor = '';
  doctors = Doctors;
  ngOnInit() {
    const data = sessionStorage.getItem('successData');
    if (data) {
      const { date, doctor } = JSON.parse(data);
      this.date = date;
      this.doctor = doctor;
    }
  }

  ngOnDestroy() {
    sessionStorage.removeItem('successData');
  }
}
