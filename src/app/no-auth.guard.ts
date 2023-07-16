import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate: CanActivateFn = () => {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/summary']);
      return true;
    } else {
      return false;
    }
  };
}
