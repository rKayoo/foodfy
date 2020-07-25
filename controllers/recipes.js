const fs = require('fs');
const data = require('../data.json');

exports.index = function(req, res) {
  return res.render('admin/index', { recipes: data.recipes});
}

exports.create = function(req, res) {
  return res.render('admin/create');
}

exports.post = function(req, res) {
  const keys = Object.keys(req.body);

  for(key of keys) {
    if (
      (req.body[key] == '' || !req.body[key]) &&
      key != 'information'
    ) {
      return res.send('Please, fill all the fields!');
    }
  }

  let {
    title,
    image_url,
    ingredients,
    preparation,
    information
  } = req.body;

  let id = 1;
  const lastRecipe = data.recipes[data.recipes.length - 1];

  if(lastRecipe) {
    id = lastRecipe.id + 1;
  }

  data.recipes.push({
    id,
    title,
    image_url,
    ingredients,
    preparation,
    information
  })

  fs.writeFile('data.json', JSON.stringify(data,null, 2), function(err) {
    if(err) return res.send('Write file error!')

    return res.redirect(`/admin/recipes/${id}`)
  })
}

exports.show = function(req, res) {
  const { id } = req.params;

  const findRecipe = data.recipes.find(function(recipe) {
    return recipe.id == id;
  })

  if(!findRecipe) return res.send('Recipe not found!');

  const recipe = { ...findRecipe };

  return res.render('admin/show', { recipe });
}

exports.edit = function(req, res) {
  const { id } = req.params;

  const findRecipe = data.recipes.find(function(recipe) {
    return recipe.id == id;
  })

  if(!findRecipe) return res.send('Recipe not found!');

  const recipe = { ...findRecipe };

  return res.render('admin/edit', { recipe });
}

exports.put = function(req, res) {
  let { id } = req.body;
  let index = 0;
  
  const findRecipe = data.recipes.find(function(recipe, foundIndex) {
    if(recipe.id == id) {
      index = foundIndex;
      return true;
    }
  })

  if(!findRecipe) return res.send('Recipe not found!');

  const recipe = {
    ...findRecipe,
    ...req.body,
    id: Number(req.body.id)
  }

  data.recipes[index] = recipe;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send('It was not possible to edit')

    return res.redirect(`/admin/recipes/${id}`);
  })
}

exports.delete = function(req, res) {
  let { id } = req.body;
  
  const recipes = data.recipes.filter(function(recipe) {
    return id != recipe.id;
  })

  data.recipes = recipes;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send('It was not possible to edit')

    return res.redirect(`/admin/recipes`);
  })
}