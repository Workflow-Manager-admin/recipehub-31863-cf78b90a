const db = require('../models/db');
const { v4: uuidv4 } = require('uuid');

/**
 * PUBLIC_INTERFACE
 * Create a recipe
 */
function createRecipe(recipe, ownerId) {
  const newRecipe = {
    id: uuidv4(),
    ...recipe,
    ownerId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  db.recipes.push(newRecipe);
  return newRecipe;
}

/**
 * PUBLIC_INTERFACE
 * Edit a recipe
 */
function updateRecipe(recipeId, partialRecipe, userId) {
  const recipe = db.recipes.find(r => r.id === recipeId);
  if (!recipe) throw new Error('Recipe not found');
  if (recipe.ownerId !== userId) throw new Error('Not allowed');
  Object.assign(recipe, partialRecipe, { updatedAt: new Date().toISOString() });
  return recipe;
}

/**
 * PUBLIC_INTERFACE
 * Delete a recipe (only owner)
 */
function deleteRecipe(recipeId, userId) {
  const idx = db.recipes.findIndex(r => r.id === recipeId);
  if (idx === -1) throw new Error('Recipe not found');
  if (db.recipes[idx].ownerId !== userId) throw new Error('Not allowed');
  db.recipes.splice(idx, 1);
  return true;
}

/**
 * PUBLIC_INTERFACE
 * Get all recipes (optionally search)
 */
function searchRecipes({ query }) {
  if (!query) return db.recipes;
  const lower = query.toLowerCase();
  return db.recipes.filter(r =>
    r.title?.toLowerCase().includes(lower) ||
    r.description?.toLowerCase().includes(lower) ||
    (r.ingredients?.some(i => i.toLowerCase().includes(lower)))
  );
}

/**
 * PUBLIC_INTERFACE
 * Get recipe by ID
 */
function getRecipeById(id) {
  return db.recipes.find(r => r.id === id);
}

module.exports = {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  searchRecipes,
  getRecipeById
};
