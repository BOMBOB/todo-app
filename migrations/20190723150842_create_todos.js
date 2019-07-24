
exports.up = function(knex) {
  return knex.schema.createTable('todos', (t) => {
    t.increments('id').unsigned().primary();
    t.string('name');
    // t.timestamp('created_at');
    // t.timestamp('updated_at');
    t.timestamps(false, true);
    // t.timestamp('deleted_at');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('todos');
};
