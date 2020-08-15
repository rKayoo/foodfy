const Recipe = require('../models/Recipe');

module.exports = {
  index: function(req, res) {
    Recipe.all(function(recipes) {
      return res.render('recipes/index', { recipes });
    })
  },
  create: function(req, res) {
    Recipe.getChefs(function(chefs) {
      return res.render('recipes/create', { chefs });
    });
  },
  post: function(req, res) {
    const keys = Object.keys(req.body);
  
    for(key of keys) {
      if (
          (req.body[key] == '' || !req.body[key])
          && key != 'information'
      ) {
        return res.send('Please, fill all the fields!');
      }
    }

    Recipe.create(req.body, function(recipe) {
      return res.redirect(`recipes/${recipe.id}`);
    })
  },
  show: function(req, res) {
    Recipe.show(req.params.id, function(recipe) {
      if(!recipe) res.send('Recipe not found');

      return res.render('recipes/show', { recipe });
    })
  },
  edit: function(req, res) {
    Recipe.find(req.params.id, function(recipe) {
      if(!recipe) res.send('Recipe not found');

      return res.render('recipes/edit', { recipe });
    });
  },
  put: function(req, res) { 
    const keys = Object.keys(req.body);
  
    for(key of keys) {
      if (
        (req.body[key] == '' || !req.body[key]) &&
        key != 'information'
      ) {
        return res.send('Please, fill all the fields!');
      }
    }

    Recipe.update(req.body, function() {
      res.redirect(`recipes/${req.body.id}`);
    }) 
  },
  delete: function(req, res) {
    Recipe.delete(req.body.id, function() {
      res.redirect('/admin/recipes');
    })
  }
}