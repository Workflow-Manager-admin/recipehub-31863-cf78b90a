import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService, User, UserCredentials } from '../core/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  readonly user$ = this.userSubject.asObservable();
  readonly loading$ = this.loadingSubject.asObservable();

  // PUBLIC_INTERFACE
  constructor(private api: ApiService) {
    if (typeof window !== 'undefined') {
      this.autoLogin();
    }
  }

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

  private setToken(token: string) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('authToken', token);
      }
    } catch {}
  }

  private clearToken() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem('authToken');
      }
    } catch {}
  }

  get user(): User | null {
    return this.userSubject.value;
  }

  get token(): string | null {
    return this.getToken();
  }

  login(credentials: UserCredentials): Observable<any> {
    this.loadingSubject.next(true);
    return this.api.login(credentials).pipe(
      tap(data => {
        this.setToken(data.token);
        this.userSubject.next(data.user);
        this.loadingSubject.next(false);
      })
    );
  }

  register(credentials: UserCredentials): Observable<any> {
    this.loadingSubject.next(true);
    return this.api.register(credentials).pipe(
      tap(data => {
        this.setToken(data.token);
        this.userSubject.next(data.user);
        this.loadingSubject.next(false);
      })
    );
  }

  logout() {
    this.clearToken();
    this.userSubject.next(null);
  }

  autoLogin() {
    const token = this.getToken();
    if (token) {
      this.api.getUser(token).subscribe(
        user => this.userSubject.next(user),
        () => {
          this.userSubject.next(null);
          this.clearToken();
        }
      );
    }
  }
}
