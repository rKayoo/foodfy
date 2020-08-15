const db = require('../../config/db');
const { date } = require('../../lib/utils');

module.exports = {
  all(callback) {
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
  getChefs(callback) {
    db.query(`
      SELECT * FROM chefs
    `, function(err, results) {
      if(err) throw `Database error! $(err)`;

      callback(results.rows);
    });
  },
  show(id, callback) {
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
  create(data, callback) {
    const query = `
      INSERT INTO recipes (
        chef_id,
        image,
        title,
        ingredients,
        preparation,
        information,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `;

    const values = [
      data.chef,
      data.image_url,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso
    ]
    
    db.query(query, values, function(err, results) {
      if(err) throw `Database error! ${err}`

      callback(results.rows[0]);
    })
  },
  find(id, callback) {
    db.query(`
      SELECT * FROM recipes
      WHERE id = $1`, [id], function(err, results) {
        if(err) throw `Database error! ${err}`

        callback(results.rows[0]);
      })
  },
  update(data, callback) {
    const query = `
      UPDATE recipes SET 
       image=($1),
       title=($2),
       ingredients=($3),
       preparation=($4),
       information=($5)
       WHERE id = $6
    `

    const values = [
      data.image_url,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.id
    ]

    db.query(query, values, function(err, results) {
      if(err) throw `Database error! ${err}`

      callback();
    })
  },
  delete(id, callback){
    db.query(`
      DELETE FROM recipes
      WHERE id = $1
    `, [id], function(err, results) {
      if(err) throw `Database error! ${err}`;

      callback();
    })
  }
}