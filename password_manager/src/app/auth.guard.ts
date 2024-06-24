
// auth.guard.ts
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from './services/authentification.services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
