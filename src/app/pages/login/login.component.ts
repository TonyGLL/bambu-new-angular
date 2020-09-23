import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// SERVICE
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user$: Observable<any> = this.authService.afAuth.user;
  loading = false;

  loginForm = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  constructor(
    public authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  // LOGIN
  async onLogin(): Promise<any> {
    const { email, password } = this.loginForm.value;
    try {
      const user = await this.authService.login(email, password);
      if (user && user.emailVerified) {
        this.loginForm.reset();
        this.router.navigate(['/news']);
      } else if (user) {
        this.router.navigate(['/verify-email']);
      } else {
        this.router.navigate(['/register']);
      }
    } catch (error) {
      console.log('Error =>', error);
    }
  }

  // INPUTS VALIDATE
  isValidInput(name: string): boolean {
    const fieldName = this.loginForm.get(name);
    return fieldName.invalid && fieldName.touched;
  }
}
