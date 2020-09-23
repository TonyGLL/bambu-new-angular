import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

// SERVICE
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  userEmail = new FormControl('');
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async getNewPassword(): Promise<any> {
    try {
      const email = this.userEmail.value;
      await this.authService.resetPassword(email);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Email Sent',
        showConfirmButton: true,
      });
      this.router.navigate(['/login']);
    } catch (error) {
      alert(error);
    }
  }
}
