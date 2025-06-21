const userService = require('../services/userService');

/**
 * PUBLIC_INTERFACE
 * Register new user
 */
async function register(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }
    const user = await userService.registerUser(username, password);
    return res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

/**
 * PUBLIC_INTERFACE
 * User login/authentication
 */
async function login(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }
    const { token } = await userService.authenticateUser(username, password);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

/**
 * PUBLIC_INTERFACE
 * Get user profile (for authenticated user)
 */
function me(req, res) {
  const user = userService.getUserById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.status(200).json({ id: user.id, username: user.username });
}

module.exports = {
  register,
  login,
  me
};
