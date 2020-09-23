import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

// SERVICE
import { AuthService } from '../services/auth.service';
import { take, tap, map } from 'rxjs/operators';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CheckLoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user$.pipe(
      take(1),
      map((user) => user && this.authService.isEditor(user)),
      tap((canEdit) => {
        if (!canEdit) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No tiene permisos para ejecutar esta acción.',
            showConfirmButton: true,
          });
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
