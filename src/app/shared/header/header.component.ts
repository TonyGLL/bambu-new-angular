import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// SERVICE
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public user$: Observable<any> = this.authService.afAuth.user;
  public isLogged = false;
  public clicked = false;
  constructor(public authService: AuthService, private router: Router) {}

  async onLogout(): Promise<any> {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
      this.clicked = false;
    } catch (error) {
      console.log('Error =>', error);
    }
  }

  userClick(): void {
    if (this.clicked) {
      this.clicked = false;
    } else {
      this.clicked = true;
    }
  }
}
