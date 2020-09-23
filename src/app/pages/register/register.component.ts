import { Component } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// SERVICE
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = this.formBuilder.group({
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

  // REGISTER
  async onRegister(): Promise<any> {
    const { email, password } = this.registerForm.value;
    this.authService.loading = true;
    try {
      const user = await this.authService.register(email, password);
      if (user) {
        this.authService.loading = false;
        this.registerForm.reset();
        this.router.navigate(['/verify-email']);
      }
    } catch (error) {
      console.log('Error =>', error);
    }
  }

  // INPUTS VALIDATE
  isValidInput(name: string): boolean {
    const fieldName = this.registerForm.get(name);
    return fieldName.invalid && fieldName.touched;
  }
}
