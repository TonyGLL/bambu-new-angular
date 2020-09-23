import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

// SERVICE
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css'],
})
export class SendEmailComponent implements OnInit {
  public user$: Observable<any> = this.authService.afAuth.user;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  // SEND EMAIL VERIFICATION
  async onSendEmail(): Promise<any> {
    this.authService.loading = true;
    try {
      this.authService.sendVerificationEmail();
      this.authService.loading = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Email Sent',
        showConfirmButton: true,
      });
    } catch (error) {
      alert(error);
    }
  }

  // REDIRECT TO LOGIN
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
