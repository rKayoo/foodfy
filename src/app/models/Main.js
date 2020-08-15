const db = require('../../config/db');

module.exports = {
  allRecipes(callback) {
    db.query(`
      SELECT recipes.*, chefs.name AS chef_name 
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      GROUP BY recipes.id, chef_name
    `, function(err, results) {
      if(err) throw `Database error! ${err}`;

      callback(results.rows);
    });
  },
  showRecipe(id, callback) {
    const query = `
      SELECT recipes.* , chefs.name AS chef_name
      FROM recipes LEFT JOIN
      chefs ON (recipes.chef_id = chefs.id)
      WHERE recipes.id = $1
      GROUP BY recipes.id, chef_name
    `;
    db.query(query, [id],function(err, results) {
      if(err) `Database error! ${err}`;

      callback(results.rows[0]);
    });
  },
  findByRecipe(filter, callback) {
    let query = `
      SELECT recipes.*, chefs.name AS chef_name 
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      GROUP BY recipes.id, chef_name
    `;

    if(filter) {
      query = `
        SELECT recipes.*, chefs.name AS chef_name 
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.title ILIKE '%${filter}%'
        GROUP BY recipes.id, chef_name
      `;
    }

    db.query(query, function(err, results) {
      if(err) throw `Database error! ${err}`;

      callback(results.rows);
    });
  },
  allChefs(callback) {
    db.query(`
      SELECT chefs.*, count(recipes) AS total_recipes 
      FROM chefs  
      LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
      GROUP BY chefs.id
    `, function(err, results) {
      if(err) throw `Database error! ${err}`;

      callback(results.rows);
    })
  }
}