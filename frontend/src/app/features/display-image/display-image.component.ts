import { NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../services/admin.service';
import { environment } from '../../../environments/environment';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-display-image',
  imports: [NgIf],
  templateUrl: './display-image.component.html',
  styleUrl: './display-image.component.css',
})
export class DisplayImageComponent {
  @ViewChild('displayImage') modalContent!: TemplateRef<any>;
  error: string = '';
  imageUrl: SafeUrl | null = null;
  modalRef: any;
  baseUrl: string = environment.apiBaseUrl;
  selectedImageId: string = '';
  @Input() imageId = '';
  isLoading: boolean = false;
  constructor(
    private modalService: NgbModal,
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {}

  open() {
    this.modalRef = this.modalService.open(this.modalContent, {
      size: 'lg',
      windowClass: 'dark-modal',
    });
  }

  showImage(imageId: string) {
    this.imageId = imageId;
    this.imageUrl = null;
    this.error = '';
    this.loadImage();

    setTimeout(() => this.open(), 0); // ensure view is ready before opening modal
  }
  loadImage() {
    this.isLoading = true;
    this.imageUrl = null;
    this.adminService.showImage(this.imageId).subscribe({
      next: (blob: Blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.error = '';
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error?.error || 'Failed to load Image';
        this.isLoading = false;
      },
    });
  }
}
