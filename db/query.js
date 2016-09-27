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
  }
}
