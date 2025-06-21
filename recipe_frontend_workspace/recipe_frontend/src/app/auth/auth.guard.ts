import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private router: Router) {}

  private getToken(): string | null {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem('authToken');
      }
    } catch {
      return null;
    }
    return null;
  }

  canActivate(): boolean {
    const token = this.getToken();
    if (token) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
