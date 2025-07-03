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
import { AuthService } from '../../services/auth.service';

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
    RouterLink,
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
  userName: string = '';
  password: string = '';
  errorMessage: string = '';
  isPasswordVisible = false;

  togglePassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
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
    const credentials = {
      userEmail: 'admin@example.com',
      userPassword: this.adminOtp,
    };
    this.isLoading = true;
    console.log(this.isLoading);
    
    localStorage.removeItem('access_token');
    this.authService.login(credentials).subscribe({
      next: (response) => {
        //  successful login
        console.log('Login success:', response);
        localStorage.setItem('access_token', (response as any).token);
        // do something like navigate to dashboard
        this.isLoading = false;
        if (this.modalRef) {
          this.modalRef.close(); // this triggers .finally()
          this.modalRef = null;
        }
        this.router.navigate(['admin-dashboard']);
      },
      error: (error) => {
        console.log(error);
        console.log(error.error);
        this.otpError = 'Invalid OTP. Please try again.';
        event.setValue('');
        this.isLoading = false;
      },
    });
   
  }

  onSubmit(loginForm: NgForm) {
    const credentials = {
      userEmail: loginForm.value.email,
      userPassword: loginForm.value.password,
    };
    this.isLoading = true;
    localStorage.removeItem('access_token');
    this.authService.login(credentials).subscribe({
      next: (response) => {
        //  successful login
        console.log('Login success:', response);
        localStorage.setItem('access_token', (response as any).token);
        // do something like navigate to dashboard
        this.isLoading = false;
        this.router.navigate(['appointment-form']);
      },
      error: (error) => {
        console.log(error);
        console.log(error.error);

        this.errorMessage = error.error.message || 'Login failed';
        this.isLoading = false;
      },
    });
  }
}
