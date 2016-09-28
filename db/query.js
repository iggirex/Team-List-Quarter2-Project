var knex = require('./knex.js');

var Users = function(){
  return knex('users')
}

module.exports = {
  getAllUsers : function(){
    return Users();
  },
  getAllUsersByIdAndGoogleProfileId : function(profile){
    return Users().where('id', profile.id)
  },
  registerNewUser: function(id, user_name, genre, musical_instrument, influence, bio) {
    return Users().where('id', id).update({
      user_name: user_name,
      genre: genre,
      musical_instrument: musical_instrument,
      influence: influence,
      bio: bio
    })
  }
}
