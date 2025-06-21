import { Component, OnInit } from '@angular/core';
import { ApiService, Recipe } from '../core/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeCardComponent } from './recipe-card.component';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RecipeCardComponent],
  template: `
    <section>
      <div style="display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap;">
        <h2>Recipes</h2>
        <input
          placeholder="Search recipes..."
          [(ngModel)]="search"
          (ngModelChange)="fetch()"
          aria-label="Search recipes"
          style="min-width: 180px; max-width: 320px"
        />
      </div>
      <div *ngIf="recipes.length === 0" class="card">No recipes found.</div>
      <div class="recipes-grid">
        <app-recipe-card
          *ngFor="let recipe of recipes"
          [recipe]="extendRecipe(recipe)">
        </app-recipe-card>
      </div>
    </section>
  `,
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [];
  search = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetch();
  }

  // Optionally, recipes can be extended with imageUrl (random img for demo)
  extendRecipe(recipe: Recipe): any {
    // Placeholder if no imageURL (as API doesn't provide it)
    return Object.assign({}, recipe, {
      imageUrl: (recipe as any).imageUrl ||
        `https://source.unsplash.com/320x240/?recipe,food,${encodeURIComponent(recipe.title)}`
    });
  }

  fetch() {
    this.apiService.getRecipes(this.search).subscribe({
      next: (res) => this.recipes = res,
      error: () => this.recipes = []
    });
  }
}
