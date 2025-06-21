/**
 * Controller for recipes REST API
 */
const recipeService = require('../services/recipeService');

/**
 * PUBLIC_INTERFACE
 * List/search recipes
 */
function list(req, res) {
  const { q } = req.query;
  const recipes = recipeService.searchRecipes({ query: q });
  res.status(200).json(recipes);
}

/**
 * PUBLIC_INTERFACE
 * Get recipe by id
 */
function get(req, res) {
  const { id } = req.params;
  const recipe = recipeService.getRecipeById(id);
  if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
  res.status(200).json(recipe);
}

/**
 * PUBLIC_INTERFACE
 * Create new recipe
 */
function create(req, res) {
  try {
    const recipe = recipeService.createRecipe(req.body, req.user.id);
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

/**
 * PUBLIC_INTERFACE
 * Update/edit recipe
 */
function update(req, res) {
  const { id } = req.params;
  try {
    const recipe = recipeService.updateRecipe(id, req.body, req.user.id);
    res.status(200).json(recipe);
  } catch (err) {
    res.status(err.message === 'Not allowed' ? 403 : 400).json({ message: err.message });
  }
}

/**
 * PUBLIC_INTERFACE
 * Delete recipe
 */
function remove(req, res) {
  const { id } = req.params;
  try {
    recipeService.deleteRecipe(id, req.user.id);
    res.status(204).end();
  } catch (err) {
    res.status(err.message === 'Not allowed' ? 403 : 404).json({ message: err.message });
  }
}

module.exports = {
  list,
  get,
  create,
  update,
  remove
};
