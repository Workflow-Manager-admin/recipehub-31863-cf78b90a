import { Component, OnInit } from '@angular/core';
import { ApiService, Recipe } from '../core/api.service';

@Component({
  selector: 'app-recipes-list',
  template: `
    <div class="card">
      <h2>Recipes</h2>
      <input placeholder="Search recipes..." [(ngModel)]="search" (ngModelChange)="fetch()" />
      <div *ngIf="recipes.length === 0">No recipes found.</div>
      <ul>
        <li *ngFor="let recipe of recipes">
          <div style="padding: 0.5rem 0">
            <b>{{ recipe.title }}</b> <br>
            <span>{{ recipe.description }}</span>
          </div>
        </li>
      </ul>
    </div>
  `,
  standalone: false // Ensure this is not a standalone component
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [];
  search = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.apiService.getRecipes(this.search).subscribe({
      next: (res) => this.recipes = res,
      error: () => this.recipes = []
    });
  }
}
