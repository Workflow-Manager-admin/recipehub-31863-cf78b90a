import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesListComponent } from './recipes-list.component';
import { RecipeCardComponent } from './recipe-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RecipesRoutingModule,
    RecipesListComponent,
    RecipeCardComponent
  ]
})
export class RecipesModule {}
