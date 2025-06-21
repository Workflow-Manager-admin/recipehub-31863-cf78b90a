//
// In-memory storage for users, recipes, etc. (replaceable with database later)
//
const db = {
  users: [],
  recipes: [],
  ingredients: [],
  favorites: []
};

module.exports = db;
