import { Component, Input } from '@angular/core';
import { Recipe } from '../core/api.service';
import { CommonModule } from '@angular/common';

/**
 * Recipe Card UI Component
 * Displays a recipe with image, title, short description, and optionally tags and other info.
 * Triggers external click handler (or can extend for navigation).
 *
 * Inputs:
 *   - recipe: The recipe object to display (must include at least title, description, can include image, etc).
 */
@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="recipe-card" tabindex="0" [attr.aria-label]="'Recipe: ' + (recipe.title || '')">
      <div *ngIf="recipe?.imageUrl" class="thumbnail">
        <img [src]="recipe.imageUrl"
             alt="Image for {{ recipe.title }}"
             loading="lazy"
             decoding="async"
             (error)="imgError = true"
             [class.hide]="imgError" />
        <div *ngIf="imgError" class="img-placeholder"></div>
      </div>
      <div class="body">
        <div class="title">{{ recipe.title }}</div>
        <div class="desc" *ngIf="recipe.description">{{ recipe.description }}</div>
        <div *ngIf="recipe.tags && recipe.tags.length > 0" class="tags">
          <span *ngFor="let tag of recipe.tags" class="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent {
  // PUBLIC_INTERFACE
  @Input() recipe!: Recipe & { imageUrl?: string };
  imgError = false;
}
