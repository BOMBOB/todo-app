
exports.up = function(knex) {
  return knex.schema.createTable('sub_tasks', (t) => {
    t.increments('id').unsigned().primary();
    t.string('name');
    // t.timestamp('created_at');
    // t.timestamp('updated_at');
    t.integer('todo_id').unsigned().index();
    t.timestamps(false, true);
    // t.timestamp('deleted_at');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('sub_tasks');
};
