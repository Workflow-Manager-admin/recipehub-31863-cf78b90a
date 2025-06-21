import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="card" style="max-width: 400px; margin: 2rem auto;">
      <h2>Login</h2>
      <form (ngSubmit)="login()" #loginForm="ngForm" autocomplete="off">
        <label>Email</label>
        <input type="email" required [(ngModel)]="email" name="email" />
        <label>Password</label>
        <input type="password" required [(ngModel)]="password" name="password" />
        <button class="button" type="submit" [disabled]="loading">Login</button>
      </form>
      <div style="margin-top:1rem;">
        <span>Don't have an account? <a routerLink="/auth/register">Register</a></span>
      </div>
      <div *ngIf="error" style="color:#E91E63;">{{ error }}</div>
    </div>
  `,
  standalone: false // Ensure this is not a standalone component
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.loading = true;
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Failed to login';
      }
    });
  }
}
