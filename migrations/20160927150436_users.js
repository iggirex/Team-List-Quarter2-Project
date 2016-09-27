
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.string('id');
    table.string('name');
    table.string('first_name');
    table.string('last_name');
    table.text('photo')
    table.string('email');
    table.string('token');
    table.string('genre');
    table.string('musical_instrument');
    table.string('influence');
    table.text('bio');
    table.boolean('admin');
    table.boolean('banned')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
