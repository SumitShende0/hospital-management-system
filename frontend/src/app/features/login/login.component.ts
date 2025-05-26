import { NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgOtpInputComponent } from 'ng-otp-input';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    NgOtpInputComponent,
    FormsModule,
    NgIf,
    NgxIntlTelInputModule,
    ButtonComponent
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;
  isLoading: boolean = false;
  isAdminModalOpen: boolean = true;
  @ViewChild('content') modalTemplate: any;
  adminOtp: string = '';

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.route.url.subscribe((segment) => {
      const lastSegment = segment[segment.length - 1]?.path;

      if (lastSegment === 'admin') {
        this.modalService
          .open(this.modalTemplate, {
            centered: true,
            windowClass: 'dark-modal',
          })
          .result.finally(() => {
            this.router.navigate(['']);
          });
      }
    });
  }

  onInputChange(event: string) {
    this.adminOtp = event;
  }

  otpSubmit() {
    console.log(this.adminOtp);
  }

  onSubmit(loginForm: NgForm) {
    console.log(loginForm.value);
  }
}
