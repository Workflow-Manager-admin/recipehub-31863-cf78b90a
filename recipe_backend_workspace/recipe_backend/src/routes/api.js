const express = require('express');
const userController = require('../controllers/userController');
const recipeController = require('../controllers/recipeController');
const favoriteController = require('../controllers/favoriteController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: User authentication
 *   - name: Recipes
 *     description: Manage recipes
 *   - name: Favorites
 *     description: Manage favorite recipes
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: { type: string }
 *               password: { type: string }
 *     responses:
 *       201: { description: User registered }
 *       400: { description: Validation error }
 */
router.post('/auth/register', userController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: { type: string }
 *               password: { type: string }
 *     responses:
 *       200: { description: Success, returns JWT token }
 *       400: { description: Invalid credentials }
 */
router.post('/auth/login', userController.login);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Return user profile }
 *       401: { description: Unauthorized }
 */
router.get('/users/me', authenticateToken, userController.me);

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Browse or search recipes
 *     tags: [Recipes]
 *   post:
 *     summary: Create new recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 */
router.get('/recipes', recipeController.list);
router.post('/recipes', authenticateToken, recipeController.create);

/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     summary: Get recipe by id
 *     tags: [Recipes]
 *   put:
 *     summary: Edit recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *   delete:
 *     summary: Delete recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 */
router.get('/recipes/:id', recipeController.get);
router.put('/recipes/:id', authenticateToken, recipeController.update);
router.delete('/recipes/:id', authenticateToken, recipeController.remove);

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Get user's favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *   post:
 *     summary: Add favorite
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 */
router.get('/favorites', authenticateToken, favoriteController.list);
router.post('/favorites', authenticateToken, favoriteController.add);
/**
 * @swagger
 * /favorites/{recipeId}:
 *   delete:
 *     summary: Remove recipe from favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/favorites/:recipeId', authenticateToken, favoriteController.remove);

module.exports = router;
