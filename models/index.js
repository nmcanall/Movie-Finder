const User = require('./User')
const UserData = require('./UserData')
const Movie = require('./Movie')
const UserRating = require('./UserRating')

User.hasOne(UserData, {foreignKey: 'user_id'})
User.hasMany(UserRating, {foreignKey: 'user_id'})

UserData.belongsTo(User, {foreignKey: 'user_id'})

Movie.hasMany(UserRating, {foreignKey: 'movie_id'})

UserRating.belongsTo(User, {foreignKey: 'user_id'})
UserRating.belongsTo(Movie, {foreignKey: 'movie_id'})

module.exports = {User,UserData,Movie,UserRating}
