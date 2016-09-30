
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({id:'102048188567270385504' , name: 'Jam Jam', user_name:'jamazon', email:'jamazonapp@gmail.com', admin:true}),
      ]);
    });
};
