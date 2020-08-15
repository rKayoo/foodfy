const Chef = require('../models/Chef');

module.exports = {
  index: function(req, res) {
    Chef.all(function(chefs) {
      return res.render('chefs/index', { chefs });
    })
  },
  create: function(req, res) {
    return res.render('chefs/create');
  },
  post: function(req, res) {
    const keys = Object.keys(req.body);
  
    for(key of keys) {
      if (req.body[key] == '' || !req.body[key]) {
        return res.send('Please, fill all the fields!');
      }
    }

    Chef.create(req.body, function(chef) {
      return res.redirect(`chefs/${chef.id}`);
    })
  },
  show: function(req, res) {
    Chef.findTotalRecipes(req.params.id, function(chef) {
      if(!chef) res.send('Chef not found');

      Chef.findRecipe(chef.id, function(recipes) {
        return res.render('chefs/show', { chef, recipes });
      })
    })
  },
  edit: function(req, res) {
    Chef.find(req.params.id, function(chef) {
      if(!chef) res.send('Chef not found');

      return res.render('chefs/edit', { chef });
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

    Chef.update(req.body, function() {
      res.redirect(`chefs/${req.body.id}`);
    }) 
  },
  delete: function(req, res) {
    Chef.delete(req.body.id, function() {
      res.redirect('/admin/chefs');
    })
  }
}