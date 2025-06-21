const db = require('../models/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

/**
 * PUBLIC_INTERFACE
 * Registers a new user.
 */
async function registerUser(username, password) {
  if (db.users.find(u => u.username === username)) {
    throw new Error('Username already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 8);
  const user = { id: uuidv4(), username, password: hashedPassword };
  db.users.push(user);
  return { id: user.id, username: user.username };
}

/**
 * PUBLIC_INTERFACE
 * Authenticates user, returns JWT if valid.
 */
async function authenticateUser(username, password) {
  const user = db.users.find(u => u.username === username);
  if (!user) throw new Error('Invalid username or password');
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid username or password');
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  return { token };
}

/**
 * PUBLIC_INTERFACE
 * Verifies a JWT token, returns user object.
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

/**
 * PUBLIC_INTERFACE
 * Gets user by ID
 */
function getUserById(id) {
  return db.users.find(u => u.id === id);
}

module.exports = {
  registerUser,
  authenticateUser,
  verifyToken,
  getUserById
};
