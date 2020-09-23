import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

// SERVICE
import { AuthService } from '../services/auth.service';
import { take, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CheckLoginGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user$.pipe(
      take(1),
      map((user) => user && this.authService.isEditor(user)),
      tap((canEdit) => {
        if (!canEdit) {
          window.alert('Acceso denegado no tiene permisos.');
        }
      })
    );
  }
}
