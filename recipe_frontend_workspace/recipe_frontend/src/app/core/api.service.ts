import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserCredentials {
  email: string;
  password: string;
}
export interface User {
  id: string;
  email: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  isFavorite?: boolean;
  authorId?: string;
  tags?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {}

  // PUBLIC_INTERFACE
  login(creds: UserCredentials): Observable<{ token: string, user: User }> {
    return this.http.post<{ token: string, user: User }>(`${this.BASE_URL}/auth/login`, creds);
  }

  // PUBLIC_INTERFACE
  register(creds: UserCredentials): Observable<{ token: string, user: User }> {
    return this.http.post<{ token: string, user: User }>(`${this.BASE_URL}/auth/register`, creds);
  }

  // PUBLIC_INTERFACE
  getUser(token: string): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.BASE_URL}/auth/me`, { headers });
  }

  // PUBLIC_INTERFACE
  getRecipes(search?: string, filters?: { [key: string]: any }): Observable<Recipe[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value != null && value !== '') {
          params = params.set(key, value);
        }
      });
    }
    return this.http.get<Recipe[]>(`${this.BASE_URL}/recipes`, { params });
  }

  // PUBLIC_INTERFACE
  getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.BASE_URL}/recipes/${id}`);
  }

  // PUBLIC_INTERFACE
  addRecipe(recipe: Partial<Recipe>, token: string): Observable<Recipe> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Recipe>(`${this.BASE_URL}/recipes`, recipe, { headers });
  }

  // PUBLIC_INTERFACE
  updateRecipe(id: string, recipe: Partial<Recipe>, token: string): Observable<Recipe> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Recipe>(`${this.BASE_URL}/recipes/${id}`, recipe, { headers });
  }

  // PUBLIC_INTERFACE
  deleteRecipe(id: string, token: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.BASE_URL}/recipes/${id}`, { headers });
  }

  // PUBLIC_INTERFACE
  getFavorites(token: string): Observable<Recipe[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Recipe[]>(`${this.BASE_URL}/favorites`, { headers });
  }

  // PUBLIC_INTERFACE
  addFavorite(recipeId: string, token: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<void>(`${this.BASE_URL}/favorites/${recipeId}`, {}, { headers });
  }

  // PUBLIC_INTERFACE
  removeFavorite(recipeId: string, token: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.BASE_URL}/favorites/${recipeId}`, { headers });
  }
}
