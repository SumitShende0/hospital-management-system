import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgOtpInputComponent } from 'ng-otp-input';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { ButtonComponent } from '../button/button.component';
import { HtmlTagDefinition } from '@angular/compiler';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    NgOtpInputComponent,
    FormsModule,
    NgIf,
    NgxIntlTelInputModule,
    ButtonComponent,
    NgClass,
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
  otpError: string = '';
  modalRef: any;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.route.url.subscribe((segment) => {
      const lastSegment = segment[segment.length - 1]?.path;

      if (lastSegment === 'admin') {
        this.modalRef = this.modalService.open(this.modalTemplate, {
          centered: true,
          windowClass: 'dark-modal',
        });

        this.modalRef.result.catch(() => {
          this.router.navigate(['']);
        });
      }
    });
  }

  onInputChange(event: string) {
    this.adminOtp = event;
  }

  otpSubmit(event: NgOtpInputComponent) {
    if (this.adminOtp.match('123456')) {
      if (this.modalRef) {
        this.modalRef.close(); // this triggers .finally()
        this.modalRef = null;
      }
      this.router.navigate(['admin-dashboard']);
    } else {
      this.otpError = 'Invalid OTP. Please try again.';
      event.setValue('');
    }
  }

  onSubmit(loginForm: NgForm) {
    console.log(loginForm.value);
  }
}
