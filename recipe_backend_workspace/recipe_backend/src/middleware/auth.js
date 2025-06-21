const userService = require('../services/userService');

/**
 * PUBLIC_INTERFACE
 * Express middleware to check JWT and set req.user if valid
 */
function authenticateToken(req, res, next) {
  const auth = req.headers['authorization'];
  const token = auth && auth.startsWith('Bearer ') ? auth.split(' ')[1] : null;
  if (!token) return res.status(401).json({ message: 'Missing token' });
  const decoded = userService.verifyToken(token);
  if (!decoded) return res.status(401).json({ message: 'Invalid token' });
  req.user = decoded;
  next();
}

module.exports = { authenticateToken };
