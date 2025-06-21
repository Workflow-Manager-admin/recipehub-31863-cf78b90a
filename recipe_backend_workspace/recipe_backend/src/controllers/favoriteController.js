const favoriteService = require('../services/favoriteService');

/**
 * PUBLIC_INTERFACE
 * Get all favorites for current user (IDs)
 */
function list(req, res) {
  const favorites = favoriteService.getFavorites(req.user.id);
  res.status(200).json(favorites);
}

/**
 * PUBLIC_INTERFACE
 * Add recipe to favorites
 */
function add(req, res) {
  const { recipeId } = req.body;
  favoriteService.addFavorite(req.user.id, recipeId);
  res.status(201).json({ success: true });
}

/**
 * PUBLIC_INTERFACE
 * Remove recipe from favorites
 */
function remove(req, res) {
  const { recipeId } = req.params;
  favoriteService.removeFavorite(req.user.id, recipeId);
  res.status(204).end();
}

module.exports = {
  list,
  add,
  remove
};
