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
  insertAdditionalInfo: function(body) {
    return Users().where({ id: body.user.id}).update({
      user_name: body.username,
      genre: body.genre,
      musical_instrument: body.instruments,
      influence: body.influences,
      bio: body.bio
    })
  }
}
