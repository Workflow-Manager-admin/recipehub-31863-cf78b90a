const db = require('../models/db');

/**
 * PUBLIC_INTERFACE
 * Get favorite recipe IDs for a user
 */
function getFavorites(userId) {
  return db.favorites.filter(f => f.userId === userId).map(f => f.recipeId);
}

/**
 * PUBLIC_INTERFACE
 * Add a recipe to favorites
 */
function addFavorite(userId, recipeId) {
  if (!db.favorites.find(f => f.userId === userId && f.recipeId === recipeId)) {
    db.favorites.push({ userId, recipeId });
  }
}

/**
 * PUBLIC_INTERFACE
 * Remove a recipe from favorites
 */
function removeFavorite(userId, recipeId) {
  const idx = db.favorites.findIndex(f => f.userId === userId && f.recipeId === recipeId);
  if (idx !== -1) {
    db.favorites.splice(idx, 1);
  }
}

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite
};
