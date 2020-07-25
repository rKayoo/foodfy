const express = require('express');
const data = require('./data');
const recipes = require('./controllers/recipes');
const routes = express.Router();

routes.get('/', function(req, res) {
  return res.render('index', { recipes: data });
});

routes.get('/about', function(req, res) {
  return res.render('about');
});

routes.get('/recipes', function(req, res) {
  return res.render('recipes', { recipes: data });
});

routes.get("/recipes/:index", function (req, res) {
  const recipeIndex = req.params.index;
  const recipe = data[recipeIndex];

  return res.render('recipe', { recipe });
})


routes.get('/admin/recipes', recipes.index);
routes.get('/admin/recipes/create', recipes.create);
routes.get('/admin/recipes/:id', recipes.show);
routes.get('/admin/recipes/:id/edit', recipes.edit);

routes.post('/admin/recipes', recipes.post);
routes.put('/admin/recipes', recipes.put);
routes.delete('/admin/recipes', recipes.delete);

module.exports = routes;