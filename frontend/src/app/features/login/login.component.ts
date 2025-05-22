import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgOtpInputComponent } from 'ng-otp-input';

@Component({
  selector: 'app-login',
  imports: [RouterLink, NgOtpInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
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
}
