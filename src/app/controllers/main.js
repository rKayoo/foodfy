const Main = require('../models/Main');

module.exports = { 
  index: function(req, res) {
    const { filter } = req.query;

    Main.findByRecipe(filter, function(recipes) {
      return res.render('index', {recipes, filter});
    })
  },
  about: function(req, res) {
    return res.render('about');
  },
  recipes:function(req, res) {
    const { filter } = req.query;

    Main.findByRecipe(filter, function(recipes) {
      return res.render('recipes', {recipes, filter});
    })
  },
  recipe: function (req, res) {
    Main.showRecipe(req.params.id, function(recipe) {
      return res.render('recipe', { recipe });
    }) 
  },
  chefs: function(req, res) {
    Main.allChefs(function(chefs) {
      res.render('chefs', { chefs });
    })
  }
}