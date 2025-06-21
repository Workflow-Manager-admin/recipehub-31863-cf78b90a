import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then(m => m.AuthModule),
    title: 'Login / Register'
  },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipes.module').then(m => m.RecipesModule),
    title: 'Recipes'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'recipes'
  },
  {
    path: '**',
    redirectTo: 'recipes'
  }
];
